import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

import {
  ADMIN_APP_ORIGIN,
  isAdminAppHost,
  isMarketingHost,
  marketingPath,
} from "@/lib/config/admin-host";
import { SESSION_COOKIE } from "@/lib/blog/constants";

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET must be set in production.");
    }

    return new TextEncoder().encode(
      "stamped-energy-dev-session-secret-change-in-prod-32chars",
    );
  }

  return new TextEncoder().encode(secret);
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return false;
  }

  try {
    await jwtVerify(token, getSessionSecret());
    return true;
  } catch {
    return false;
  }
}

const WWW_STAMPED_HOST = "www.stamped.work";
const CANONICAL_STAMPED_HOST = "stamped.work";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0].toLowerCase();

  if (hostname === WWW_STAMPED_HOST) {
    const destination = request.nextUrl.clone();
    destination.hostname = CANONICAL_STAMPED_HOST;
    destination.protocol = "https:";
    return NextResponse.redirect(destination, 308);
  }
  const isAdminRoute = pathname.startsWith("/blog/admin");
  const isLoginRoute = pathname === "/blog/admin/login";
  const isAdminApiRoute = pathname.startsWith("/api/blog/admin") || pathname.startsWith("/api/blog/auth");

  // Marketing host: send admin UI/API to the admin origin
  if (ADMIN_APP_ORIGIN && isMarketingHost(host) && (isAdminRoute || isAdminApiRoute)) {
    const redirectUrl = new URL(pathname, ADMIN_APP_ORIGIN);
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  // Admin host: keep admin + auth API; send everything else to marketing site
  if (ADMIN_APP_ORIGIN && isAdminAppHost(host)) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/blog/admin", request.url));
    }

    if (
      !isAdminRoute &&
      !isAdminApiRoute &&
      !pathname.startsWith("/_next") &&
      pathname !== "/favicon.ico" &&
      !pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|css|js|webm|mp4|mov)$/)
    ) {
      return NextResponse.redirect(new URL(marketingPath(pathname)));
    }
  }

  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next();
  }

  const authed = await isAuthenticated(request);

  if (!authed) {
    const loginUrl = new URL("/blog/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/blog/admin/:path*",
    "/api/blog/admin/:path*",
    "/api/blog/auth/:path*",
    "/((?!_next/static|_next/image).*)",
  ],
};

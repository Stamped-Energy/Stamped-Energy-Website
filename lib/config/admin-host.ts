/**
 * Admin CMS host configuration.
 *
 * Production split:
 * - NEXT_PUBLIC_SITE_URL=https://stamped.work
 * - ADMIN_APP_ORIGIN=https://admin.stamped.work
 * - Product showcase (separate deployment): https://showcase.stamped.work
 *
 * When ADMIN_APP_ORIGIN is set, /blog/admin on the marketing host redirects to the admin subdomain.
 * Leave ADMIN_APP_ORIGIN empty for local development on localhost.
 */

function normalizeOrigin(value: string | undefined): string | null {
  if (!value?.trim()) {
    return null;
  }

  try {
    return new URL(value.trim()).origin;
  } catch {
    return null;
  }
}

export const SITE_ORIGIN =
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000";

export const ADMIN_APP_ORIGIN = normalizeOrigin(process.env.ADMIN_APP_ORIGIN);

export function isAdminAppHost(host: string): boolean {
  if (!ADMIN_APP_ORIGIN) {
    return true;
  }

  const adminHost = new URL(ADMIN_APP_ORIGIN).host;
  return host === adminHost;
}

export function isMarketingHost(host: string): boolean {
  if (!ADMIN_APP_ORIGIN) {
    return true;
  }

  return !isAdminAppHost(host);
}

export function adminPath(path = "/blog/admin"): string {
  if (!ADMIN_APP_ORIGIN) {
    return path;
  }

  return `${ADMIN_APP_ORIGIN}${path}`;
}

export function marketingPath(path = "/"): string {
  return `${SITE_ORIGIN}${path}`;
}

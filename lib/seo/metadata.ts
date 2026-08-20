import type { Metadata } from "next";

import { SITE_ORIGIN } from "@/lib/config/admin-host";
import { siteConfig } from "@/lib/content";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_PATH,
  GEO_METADATA,
  SEO_KEYWORDS,
} from "@/lib/seo/constants";
import type { PageSeoConfig } from "@/lib/seo/pages";

export function absoluteUrl(path: string): string {
  const base = SITE_ORIGIN.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  /** Bypasses the root layout title template when set. */
  absoluteTitle?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  keywords?: string[];
};

function resolveOgImage(image?: string | null): string {
  if (!image) {
    return DEFAULT_OG_IMAGE;
  }
  return image.startsWith("http") ? image : absoluteUrl(image);
}

function buildOpenGraphImages(image?: string | null) {
  const url = resolveOgImage(image);
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: DEFAULT_OG_IMAGE_ALT,
    },
  ];
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  keywords,
}: BuildPageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const displayTitle = absoluteTitle ?? `${title} | ${siteConfig.name}`;
  const ogImages = buildOpenGraphImages(image);

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: url },
    other: { ...GEO_METADATA },
    ...(keywords?.length ? { keywords } : {}),
    openGraph: {
      title: displayTitle,
      description,
      url,
      type,
      siteName: siteConfig.name,
      locale: "en_IN",
      images: ogImages,
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: authors ?? [siteConfig.name],
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [ogImages[0].url],
    },
  };
}

export function buildPageMetadataFromConfig(config: PageSeoConfig): Metadata {
  return buildPageMetadata({
    title: config.absoluteTitle,
    absoluteTitle: config.absoluteTitle,
    description: config.description,
    path: config.path,
    keywords: config.keywords ? [...config.keywords] : [...SEO_KEYWORDS],
  });
}

export const siteMetadataBase: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  other: { ...GEO_METADATA },
  keywords: [...SEO_KEYWORDS],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

export const defaultOgImageMetadata = {
  path: DEFAULT_OG_IMAGE_PATH,
  url: DEFAULT_OG_IMAGE,
  alt: DEFAULT_OG_IMAGE_ALT,
};

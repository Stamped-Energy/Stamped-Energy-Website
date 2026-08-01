import Image from "next/image";

import { isRemoteImageSrc, normalizeImageSrc } from "@/lib/media/image-src";
import { cn } from "@/lib/utils";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

/**
 * Renders site-relative images with next/image optimization and remote URLs
 * with a native img tag (same behavior as inline rich-article images).
 */
export function ContentImage({
  src,
  alt,
  className,
  fill = false,
  priority = false,
  sizes,
  width,
  height,
}: ContentImageProps) {
  src = normalizeImageSrc(src);

  if (isRemoteImageSrc(src)) {
    if (fill) {
      return (
        // Remote URLs are not constrained to next/image remotePatterns.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full", className)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1}
      height={height ?? 1}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

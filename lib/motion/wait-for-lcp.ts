/** Resolve after LCP is recorded, window load, or timeout — whichever comes first. */
export function waitForLcp(timeoutMs = 8000): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve();
    };

    const timeoutId = window.setTimeout(finish, timeoutMs);

    try {
      const observer = new PerformanceObserver((list) => {
        if (list.getEntries().length > 0) {
          window.clearTimeout(timeoutId);
          observer.disconnect();
          finish();
        }
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // PerformanceObserver unavailable — fall through to load/timeout.
    }

    if (document.readyState === "complete") {
      window.requestAnimationFrame(finish);
    } else {
      window.addEventListener(
        "load",
        () => {
          window.clearTimeout(timeoutId);
          finish();
        },
        { once: true },
      );
    }
  });
}

export function isMobileMotionLite(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(max-width: 1023px)").matches;
}

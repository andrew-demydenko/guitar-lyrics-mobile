import { useState, useEffect } from "react";

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T {
  let lastFunc: number | null = null;
  let lastRan: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();

    if (!lastRan) {
      func.apply(context, args);
      lastRan = now;
    } else {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }
      lastFunc = setTimeout(
        () => {
          if (now - (lastRan ?? 0) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (now - lastRan)
      );
    }
  } as T;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function lighten(hex: string, percent: number, opacity = 1): string {
  const { r, g, b } = hexToRgb(hex);
  const factor = percent / 100;

  return `rgba(
    ${Math.round(r + (255 - r) * factor)},
    ${Math.round(g + (255 - g) * factor)},
    ${Math.round(b + (255 - b) * factor)},
    ${opacity}
  )`;
}

export function darken(hex: string, percent: number, opacity = 1): string {
  const { r, g, b } = hexToRgb(hex);
  const factor = 1 - percent / 100;

  return `rgba(
    ${Math.round(r * factor)},
    ${Math.round(g * factor)},
    ${Math.round(b * factor)},
    ${opacity}
  )`;
}

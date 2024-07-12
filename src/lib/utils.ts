// @ts-nocheck
import { type ClassValue, clsx } from "clsx";
import { FieldHook } from "payload";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toRM = (value: number | null): string => {
  if (value === null) return "-";
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

export const toComma = (value: number | null): string => {
  if (value === null) return "-";
  return new Intl.NumberFormat("ms-MY", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
  if (item && typeof item === "object") {
    return !Array.isArray(item);
  }
  return false;
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === "string") {
      return format(value);
    }

    if (operation === "create") {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (fallbackData && typeof fallbackData === "string") {
        return format(fallbackData);
      }
    }

    return value;
  };

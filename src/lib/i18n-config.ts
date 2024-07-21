import { LocalePrefix } from "next-intl/routing";

export const defaultLocale = "ms-MY";
export const locales = [defaultLocale, "en-GB"] as const;
export const localePrefix = "as-needed" satisfies LocalePrefix;

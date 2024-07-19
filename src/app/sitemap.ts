import { locales, defaultLocale } from "@/lib/i18n-config";
import { routes } from "@/lib/routes";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.APP_URL;

  function getUrl(key: string, locale: (typeof locales)[number]) {
    return `${host}/${locale}${key === "/" ? "" : key}`;
  }

  return Object.values(routes).map((path) => ({
    url: getUrl(path, defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(path, locale)]),
      ),
    },
  }));
}

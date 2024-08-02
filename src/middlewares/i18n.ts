import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddleware } from "./chain";
import { defaultLocale, localePrefix, locales } from "@/lib/i18n-config";
import createIntlMiddleware from "next-intl/middleware";

export const I18nMiddleware = (middleware: NextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const handleI18nRouting = createIntlMiddleware({
      locales,
      localePrefix,
      defaultLocale,
    });
    const response = handleI18nRouting(request);
    return response;
  };
};

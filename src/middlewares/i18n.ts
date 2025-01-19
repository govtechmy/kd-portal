import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddleware } from "./chain";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n";

export const I18nMiddleware = (middleware: NextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const handleI18nRouting = createIntlMiddleware(routing);
    const response = handleI18nRouting(request);
    return response;
  };
};

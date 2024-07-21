import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddleware } from "./chain";

export const RouterMiddleware = (middleware: NextMiddleware) => {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const headers = new Headers(request.headers);
    headers.set("x-url", request.url);
    return middleware(request, event, response);
  };
};

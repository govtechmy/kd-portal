import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export type NextMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type NextMiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export const NextChain = (
  functions: NextMiddlewareFactory[],
  index = 0,
): NextMiddleware => {
  const current = functions[index];

  if (current) {
    const next = NextChain(functions, index + 1);
    return current(next);
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    return response;
  };
};

export const chain = async function* (
  functions: NextMiddlewareFactory[],
  args: any,
) {
  for (const func of functions) {
    yield await func(args);
  }
};

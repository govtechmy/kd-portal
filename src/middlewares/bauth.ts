import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddleware } from "./chain";

export const BAuthMiddleware = (middleware: NextMiddleware) => {
  //  Exit early
  if (
    process.env.APP_ENV === "development" ||
    process.env.APP_ENV === "production"
  )
    return async (
      request: NextRequest,
      event: NextFetchEvent,
      response: NextResponse,
    ) => middleware(request, event, response);

  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const basicAuth = request.headers.get("authorization");

    // If basic auth header is present, extract the user and password & authenticate
    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [user, password] = atob(authValue).split(":");
      if (user === "admin" && password === process.env.AUTH_TOKEN) {
        return middleware(request, event, response);
      }
    }

    return new NextResponse("Authorization required", {
      status: 401,
      headers: { "WWW-Authenticate": `Basic realm="Secure Area"` },
    });
  };
};

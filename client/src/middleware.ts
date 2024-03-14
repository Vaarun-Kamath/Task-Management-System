import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;
  const cookieHeaderValue = request.headers.get("cookie");
  const headers: HeadersInit = cookieHeaderValue
    ? { cookie: cookieHeaderValue }
    : {};

  const publicAllowedRoutes = ["/"];

  const session = await fetch(`${url.origin}/api/authSSR`, {
    headers: headers,
  }).then((res) => res.json());

  if (session) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (!publicAllowedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: "/((?!api|404|static|.*\\..*|_next).*)",
};

import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const loginURL = new URL("/login", req.url);

  if (!token) {
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/product/:path*", "/sales/:path*", "/expense/:path*"],
};

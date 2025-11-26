export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/product/:path*", "/sales/:path*", "/expense/:path*"],
};

// Middleware untuk perlindungan route
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};

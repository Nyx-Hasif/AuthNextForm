// Middleware untuk perlindungan route
export { default } from "next-auth/middleware";

// Route yang memerlukan authentication
export const config = {
  matcher: ["/dashboard"],
};

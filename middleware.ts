import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protect /admin and any sub-routes like /admin/carousel
  matcher: ["/admin/:path*"],
};
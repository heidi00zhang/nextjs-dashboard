import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  // Specify URLs to be used if you want to create custom sign in, sign out and error pages.
  // pages: {
  //   signIn: "/login",
  // },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       // console.log("User is authenticated");
  //       // return Response.redirect(new URL("/dashboard", nextUrl));
  //     }
  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;

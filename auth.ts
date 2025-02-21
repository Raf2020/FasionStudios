import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {},
  },
  callbacks: {
    async signIn({ user, account }) {
      // if (account?.provider !== "credentials") {
      // }
      return true;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.sub,
        },
      };
    },
    async jwt({ token }) {
      return token;
    },
  },
  ...authConfig,
});

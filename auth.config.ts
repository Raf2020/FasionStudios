import Credentials from "next-auth/providers/credentials";
import crypto from "crypto-js";
import { NextAuthConfig } from "next-auth";
import { AppConfig } from "./shared/constants/app.const";

export default {
  secret: AppConfig.AuthSecret,
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        return handleAuthorize(credentials);
      },
    }),
  ],
} satisfies NextAuthConfig;

const handleAuthorize = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  const { email, password } = credentials;
  try {
    const apiRes = await fetch(`${AppConfig.AppUrl}/api/user/${email}`);
    const userData = await apiRes.json();
    if (userData) {
      const hashedPassword = crypto.SHA256(password as string).toString();
      if (hashedPassword === userData.password) {
        userData.id = userData.role;
        return userData;
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
  return null;
};

// next-auth.d.ts
import "next-auth";
import { UserRole } from "./user";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }

  interface Session {
    user: User;
  }
}

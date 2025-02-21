export type User = {
  email: string;
  password: string;
  role: UserRole;
};

export enum UserRole {
  Admin = "Admin",
}

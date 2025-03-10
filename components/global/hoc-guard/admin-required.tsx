"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@/types/user.type";
import { Link } from "@/i18n/navigation";
import React from "react";

const AdminRequired = ({ children }: { children: React.ReactNode }) => {
  const sessionUser = useCurrentUser();

  return sessionUser?.role === UserRole.Admin ? (
    children
  ) : (
    <div className="flex w-full pt-60 justify-center">
      <div className="flex flex-col items-center font-medium text-center">
        <p>You are not allowed to access this page.</p>
        <p>Only Admin can access this page.</p>
        <Link className="text-primary-blue underline" href="/auth/login">
          Go to login
        </Link>
      </div>
    </div>
  );
};

export default AdminRequired;

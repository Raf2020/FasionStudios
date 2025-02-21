"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import React from "react";

const SigninRequired = ({ children }: { children: React.ReactNode }) => {
  const sessionUser = useCurrentUser();

  return sessionUser ? (
    children
  ) : (
    <div className="flex w-full pt-60 justify-center">
      <div className="flex flex-col items-center font-medium text-center">
        <p>You are not logged in.</p>
        <Link className="text-primary-blue underline" href="/auth/login">
          Go to login
        </Link>
      </div>
    </div>
  );
};

export default SigninRequired;

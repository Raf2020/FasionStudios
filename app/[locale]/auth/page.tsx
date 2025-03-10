"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, []);

  return <div></div>;
};

export default AuthPage;

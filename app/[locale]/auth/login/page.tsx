"use client";

import Input from "@/components/global/elements/input";
import PrimaryButton from "@/components/global/elements/primary-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { checkEmailFormat } from "@/shared/functions/global.functions";
import { UserRole } from "@/types/user.type";
import { useAlertStore } from "@/zustand/alert-store";
import { signIn } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { showAlert } = useAlertStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (currentUser?.role === UserRole.Admin) {
      router.push("/admin");
    }
  }, [currentUser]);

  const handleLogin = () => {
    if (checkEmailFormat(email) && password.length) {
      signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((res) => {
        if (res?.error) {
          showAlert("Error", "Email or Password is incorrect");
        } else {
          router.push("/admin");
        }
      });
    } else {
      showAlert("Error", "Please input correct email and password");
    }
  };

  return (
    <div className="flex w-full pt-60 justify-center">
      <div className="flex w-[480px] p-8 flex-col gap-4 rounded-2xl shadow-xl">
        <Input label="*Email" value={email} setValue={setEmail} />
        <Input
          label="*Password"
          value={password}
          setValue={setPassword}
          password
        />
        <PrimaryButton name="Login" onClick={handleLogin} lowHeight />
      </div>
    </div>
  );
};

export default LoginPage;

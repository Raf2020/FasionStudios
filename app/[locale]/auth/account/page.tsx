"use client";

import { updatePassword } from "@/actions/users/user.action";
import Input from "@/components/global/elements/input";
import PrimaryButton from "@/components/global/elements/primary-button";
import SigninRequired from "@/components/global/hoc-guard/signin-required";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useAlertStore } from "@/zustand/alert-store";
import { useState } from "react";

const AccountPage = () => {
  const currentUser = useCurrentUser();
  const { showAlert } = useAlertStore();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");

  const handlePasswordUpdate = () => {
    if (oldPassword.length === 0) {
      showAlert("Error", "Please input old password");
    } else if (newPassword.length === 0) {
      showAlert("Error", "Please input new password");
    } else if (newPassword !== confirmPwd) {
      showAlert("Error", "New password doesn't match with confirm password");
    } else {
      updatePassword(currentUser!.email!, oldPassword, newPassword).then(
        (res) => {
          if (res.success) {
            showAlert("Success", "Password was changed successfully");
          } else {
            showAlert("Error", res.errorMessage);
          }
        }
      );
    }
  };

  return (
    <SigninRequired>
      <div className="flex w-full pt-60 justify-center">
        <div className="flex w-[480px] p-8 flex-col gap-4 rounded-2xl shadow-xl">
          <Input
            label="Old Password"
            value={oldPassword}
            setValue={setOldPassword}
            password
          />
          <Input
            label="New Password"
            value={newPassword}
            setValue={setNewPassword}
            password
          />
          <Input
            label="Confirm Password"
            value={confirmPwd}
            setValue={setConfirmPwd}
            password
          />
          <PrimaryButton
            name="Change Password"
            onClick={handlePasswordUpdate}
          />
        </div>
      </div>
    </SigninRequired>
  );
};

export default AccountPage;

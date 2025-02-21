"use client";

import PrimaryButton from "@/components/global/elements/primary-button";
import { useState } from "react";
import { sendEmail } from "@/actions/email/email.action";
import { useAlertStore } from "@/zustand/alert-store";
import Image from "next/image";
import Loading from "@/components/global/loading";
import EmailEditor from "./email-editor";

type EmailSendDlgProps = {
  emails: string[];
  onComplete: () => void;
};

const EmailSendDlg = ({ emails, onComplete }: EmailSendDlgProps) => {
  const { showAlert } = useAlertStore();
  const [content, setContent] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);

  const handleSendEmail = () => {
    setPending(true);
    Promise.all(
      emails.map(async (email) => {
        return await sendEmail(email, undefined, content);
      })
    ).finally(() => {
      setPending(false);
      showAlert("Success", "Emails have been sent successfully");
      onComplete();
    });
  };

  return (
    <div className="z-20 fixed top-0 left-0 flex w-full h-full py-6 px-6 items-center justify-center bg-black bg-opacity-50">
      {pending && <Loading label="Sending Email ..." />}
      <div className="relative flex w-full max-w-5xl max-h-full overflow-y-auto p-6 flex-col gap-6 bg-white rounded-2xl">
        <Image
          className="absolute top-6 right-6 w-6 cursor-pointer"
          src="/images/icons/cancel.svg"
          width={21}
          height={20}
          alt="cancel"
          onClick={onComplete}
        />
        <div className="flex w-full flex-wrap items-center gap-2">
          <p className="text-primary-blue text-lg font-semibold">To: </p>
          {emails.map((email) => (
            <div key={email} className="py-1 px-4 bg-primary-blue rounded-full">
              <p className="text-primary-purple text-base">{email}</p>
            </div>
          ))}
        </div>
        <EmailEditor content={content} setContent={setContent} />
        <div className="flex w-full justify-end">
          <PrimaryButton name="Send" lowHeight onClick={handleSendEmail} />
        </div>
      </div>
    </div>
  );
};

export default EmailSendDlg;

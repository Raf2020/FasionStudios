"use client";

import {
  downloadSubscriberList,
  getAllSubscribers,
} from "@/actions/subscribe.action";
import EmailSendDlg from "@/components/admin/global/email-send-dlg";
import PageTitle from "@/components/admin/global/page-title";
import SubscribersTable from "@/components/admin/subscribers/subscribers-table";
import PrimaryButton from "@/components/global/elements/primary-button";
import { Subscriber } from "@/types/subscribe.type";
import { useEffect, useMemo, useState } from "react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [emailDlgShown, setEmailDlgShown] = useState<boolean>(false);

  const selectedSubscribers = useMemo(
    () => subscribers.filter((subscriber) => subscriber.selected),
    [subscribers]
  );

  const selectedEmails = useMemo(
    () => selectedSubscribers.map((subscriber) => subscriber.email),
    [selectedSubscribers]
  );

  useEffect(() => {
    getAllSubscribers().then((_subscribers) => {
      setSubscribers(_subscribers);
    });
  }, []);

  const handleCheckClick = (email: string) => {
    const _subscribers = [...subscribers];
    const _subscriber = _subscribers.find(
      (subscriber) => subscriber.email === email
    ) as Subscriber;
    _subscriber.selected = !_subscriber.selected;
    setSubscribers(_subscribers);
  };

  const handleDownload = () => {
    downloadSubscriberList(
      selectedSubscribers.length ? selectedSubscribers : subscribers
    );
  };

  return (
    <div className="flex w-full flex-col gap-6 bg-white">
      <PageTitle>Subscribers</PageTitle>
      <SubscribersTable
        subscribers={subscribers}
        onCheckClick={handleCheckClick}
      />
      <div className="flex gap-6">
        <PrimaryButton
          name="Download List as a sheet"
          lowHeight
          onClick={handleDownload}
        />
        {selectedSubscribers.length ? (
          <PrimaryButton
            name="Send Email"
            lowHeight
            onClick={() => setEmailDlgShown(true)}
          />
        ) : null}
      </div>
      {/* Dialogs */}
      {emailDlgShown ? (
        <EmailSendDlg
          emails={selectedEmails}
          onComplete={() => setEmailDlgShown(false)}
        />
      ) : null}
    </div>
  );
}

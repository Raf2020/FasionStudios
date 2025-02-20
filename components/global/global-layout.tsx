"use client";

import { useAlertStore } from "@/zustand/alert-store";
import { Fragment } from "react";
import Alert from "./alert";

const GlobalLayout = () => {
  const { shown: alertShown, title, message, closeAlert } = useAlertStore();

  return (
    <Fragment>
      {alertShown && (
        <Alert title={title} message={message} onClose={closeAlert} />
      )}
    </Fragment>
  );
};

export default GlobalLayout;

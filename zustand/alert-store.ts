import { create } from "zustand";

type AlertState = {
  shown: boolean;
  title: string;
  message: string;
};

type AlertAction = {
  showAlert: (title: string, message: string) => void;
  closeAlert: () => void;
};

export const useAlertStore = create<AlertState & AlertAction>((set) => ({
  shown: false,
  title: "",
  message: "",
  showAlert: (title: string, message: string) =>
    set(() => ({ shown: true, title, message: message })),
  closeAlert: () => set(() => ({ shown: false })),
}));

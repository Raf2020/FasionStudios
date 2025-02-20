import { create } from "zustand";

type GlobalState = {
  footerShown: boolean;
};

type GlobalAction = {
  setFooterShown: (footerShown: boolean) => void;
};

export const useGlobalStore = create<GlobalState & GlobalAction>((set) => ({
  footerShown: false,
  setFooterShown: (footerShown: boolean) => set(() => ({ footerShown })),
}));

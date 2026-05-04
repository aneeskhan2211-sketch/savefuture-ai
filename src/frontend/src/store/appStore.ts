import { create } from "zustand";

interface AppState {
  onboardingStep: number;
  isPremiumModalOpen: boolean;
  pageTitle: string;
  setOnboardingStep: (step: number) => void;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
  setPageTitle: (title: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  onboardingStep: 0,
  isPremiumModalOpen: false,
  pageTitle: "SaveFuture AI",
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  openPremiumModal: () => set({ isPremiumModalOpen: true }),
  closePremiumModal: () => set({ isPremiumModalOpen: false }),
  setPageTitle: (title) => set({ pageTitle: title }),
}));

import { create } from "zustand";

interface ToastState {
  message: string;
  type: "success" | "error" | "info" | null;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
}

const initialState = {
  message: "",
  type: null,
};

export const useToastStore = create<ToastState>((set) => ({
  ...initialState,
  showToast: (message, type = "info") => set({ message, type }),
  hideToast: () => set({ message: "", type: null }),
}));

export const useToast = () => {
  const { message, type, showToast, hideToast } = useToastStore();

  const toast = ({
    message: msg,
    type: toastType = "info",
  }: {
    message: string;
    type?: "success" | "error" | "info";
  }) => {
    showToast(msg, toastType);
  };

  return {
    message,
    type,
    showToast: toast,
    hideToast,
  };
};

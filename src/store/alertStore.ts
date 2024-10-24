import { create } from "zustand";

type State = {
  isOpen: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

type Actions = {
  showAlert: (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => void;
  closeAlert: () => void;
};

const alertStore = create<State & Actions>()((set) => ({
  isOpen: false,
  message: "",
  severity: "info",
  showAlert: (message, severity) => set({ isOpen: true, message, severity }),
  closeAlert: () => set({ isOpen: false, message: "" }),
}));

export default alertStore;

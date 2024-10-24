import { create } from "zustand";

type State = {
  isOpen: boolean;
  id: number | undefined;
};

type Actions = {
  handleClickOpen: (id?: number) => void;
  handleClose: () => void;
};

const dialogStore = create<State & Actions>()((set) => ({
  isOpen: false,
  id: undefined,
  handleClickOpen: (id?: number) => set({ isOpen: true, id }),
  handleClose: () => set({ isOpen: false }),
}));

export default dialogStore;

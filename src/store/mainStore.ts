import { create } from "zustand";
import { IUser, UserRoleEnum } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  userRole: UserRoleEnum;
  user: IUser | undefined;
};

type Actions = {
  logoutUser: () => void;
  signinUser: (user: IUser, userRole: UserRoleEnum) => void;
};

/**
 * Store used for user variables and methods
 */
const userStore = create<State & Actions>()(
  persist(
    (set) => ({
      userRole: UserRoleEnum.unauth,
      user: undefined,
      logoutUser: () => set({ userRole: UserRoleEnum.unauth, user: undefined }),
      signinUser: (user: IUser, userRole: UserRoleEnum) =>
        set({ user, userRole }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;

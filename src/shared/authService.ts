import userStore from "../store/mainStore";
import { redirect } from "react-router-dom";
import { IUser, UserRoleEnum } from "../types";

function signInUserAuth(user: IUser) {
  const store = userStore.getState();
  const isAdmin = user.id % 2 ? UserRoleEnum.admin : UserRoleEnum.user;
  store.signinUser(user, isAdmin);
}

function logoutUserAuth() {
  const store = userStore.getState();
  store.logoutUser();
  redirect("/");
}

export { signInUserAuth, logoutUserAuth };

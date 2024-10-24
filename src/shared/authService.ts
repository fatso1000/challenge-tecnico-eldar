import userStore from "@store/mainStore";
import { redirect } from "react-router-dom";
import { IUser, UserRoleEnum } from "../types";

/**
 * Signin user function to store user on global state
 * @param user User data
 */
function signInUserAuth(user: IUser) {
  const store = userStore.getState();
  const isAdmin = user.id % 2 ? UserRoleEnum.admin : UserRoleEnum.user;
  store.signinUser(user, isAdmin);
}

/**
 * Logout user function
 */
function logoutUserAuth() {
  const store = userStore.getState();
  store.logoutUser();
  redirect("/");
}

export { signInUserAuth, logoutUserAuth };

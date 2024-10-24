import { Navigate } from "react-router-dom";
import { UserRoleEnum } from "./types";
import useStore from "@store/mainStore";

interface ProtectedRouteProps {
  children: JSX.Element;
  routeUserRole: UserRoleEnum;
}

/**
 * Protected route used to avoid non authenticated navigations
 * @param children page to return
 * @returns param children or navigation to login page
 */
const ProtectedRoute = ({ children, routeUserRole }: ProtectedRouteProps) => {
  const userRole = useStore((state) => state.userRole);
  if (
    userRole === UserRoleEnum.unauth &&
    routeUserRole !== UserRoleEnum.unauth
  ) {
    return <Navigate to="/" />;
  }

  if (userRole !== routeUserRole) {
    const redirect =
      userRole === UserRoleEnum.admin ? "/dashboardAdmin" : "/dashboard";
    return <Navigate to={redirect} />;
  }

  return children;
};

export default ProtectedRoute;

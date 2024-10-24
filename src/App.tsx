import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./middleware";
import { UserRoleEnum } from "./types";
import UserPage from "./pages/user";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute routeUserRole={UserRoleEnum.unauth}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute routeUserRole={UserRoleEnum.user}>
        <UserPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboardAdmin",
    element: (
      <ProtectedRoute routeUserRole={UserRoleEnum.admin}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

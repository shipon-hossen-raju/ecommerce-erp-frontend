import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProductsPage from "../pages/products/ProductsPage";
import NotFoundRoute from "./NotFoundRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/signin" replace />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
]);

export default router;

import { dashboardIcons } from "../assets/icons/icons";

export const superAdminMenuItems = [
  { path: "/", label: "Dashboard", icon: dashboardIcons.layout },
  { path: "/products", label: "Products", icon: dashboardIcons.layout },
];

export const adminMenuItems = [
  ...superAdminMenuItems,
  { path: "/users", label: "Users", icon: dashboardIcons.layout },
];

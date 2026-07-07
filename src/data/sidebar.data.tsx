import { dashboardIcons } from "../assets/icons/icons";

export const baseMenuItems = [
  { path: "/", label: "Dashboard", icon: dashboardIcons.layout },
  { path: "/products", label: "Products", icon: dashboardIcons.layout },
  { path: "/sales", label: "Sales", icon: dashboardIcons.layout },
];

export const managerMenuItems = [...baseMenuItems];

export const adminMenuItems = [
  ...managerMenuItems,
  { path: "/users", label: "Users", icon: dashboardIcons.layout },
];

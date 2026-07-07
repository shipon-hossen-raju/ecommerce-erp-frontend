import { dashboardIcons } from "../assets/icons/icons";

export const baseMenuItems = [
  { path: "/", label: "Dashboard", icon: dashboardIcons.layout },
  { path: "/products", label: "Products", icon: dashboardIcons.box },
  { path: "/sales", label: "Sales", icon: dashboardIcons.trendUp },
];

export const managerMenuItems = [...baseMenuItems];

export const adminMenuItems = [
  ...managerMenuItems,
  { path: "/users", label: "Users", icon: dashboardIcons.users },
];

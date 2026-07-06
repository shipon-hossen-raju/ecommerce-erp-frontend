export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  createdAt: string;
  profileImage: string;
};

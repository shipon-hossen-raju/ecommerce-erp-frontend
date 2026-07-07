// export type IUser = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: "ADMIN" | "MANAGER" | "EMPLOYEE";
//   createdAt: string;
//   profileImage: string;
// };

export type IUserAccount = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  createdAt: string;
  updatedAt: string;
};

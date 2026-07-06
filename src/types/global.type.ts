export type IAuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  createdAt: string;
  profileImage: string;
  iat: number;
  exp: number;
};

export interface IParam {
  name: string;
  value: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IApiError {
  error: {
    status: number;
    data: {
      message: string;
    };
  };
}

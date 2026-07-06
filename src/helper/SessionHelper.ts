import { jwtDecode } from "jwt-decode";
import type { IAuthUser } from "../types/global.type";

class SessionHelper {
  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      return token;
    }
    return "";
  }

  getUserInfo() {
    const token = getToken();

    if (token) {
      const decodedData = jwtDecode(token) as IAuthUser;
      return decodedData;
    }

    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.clear();
      window.location.href = "/";
    }

    return null;
  }

  isLoggedIn() {
    const token = getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  setEmail(email: string) {
    localStorage.setItem("email", email);
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  setVerifyEmail(email: string) {
    localStorage.setItem("verifyEmail", email);
  }

  getVerifyEmail() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("verifyEmail");
    }
  }

  setOtp(otp: string) {
    localStorage.setItem("otp", otp);
  }

  getOtp() {
    return localStorage.getItem("otp");
  }

  setAuthId(authId: string) {
    localStorage.setItem("authId", authId);
  }

  getAuthId() {
    return localStorage.getItem("authId");
  }

  logout() {
    localStorage.clear();
    window.location.href = "/auth/signin";
  }
}

export const {
  setToken,
  getToken,
  setEmail,
  getEmail,
  setVerifyEmail,
  getUserInfo,
  getVerifyEmail,
  setOtp,
  getOtp,
  logout,
  isLoggedIn,
  setAuthId,
  getAuthId,
} = new SessionHelper();

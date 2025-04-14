import API from "../config/apiClient";
import { PasswordEmailParams } from "../pages/forgot-password";
import { LoginParams } from "../pages/login";
import { RegisterParams } from "../pages/register";

export const login = async (data: LoginParams) => API.post("/auth/login", data);
export const register = async (data: RegisterParams) =>
  API.post("/auth/register", data);

export const verifyEmail = async (code: string) =>
  API.get(`/auth/email/verify/${code}`);

export const sendPasswordResetEmail = async ({ email }: PasswordEmailParams) =>
  API.post("auth/password/forgot", { email });

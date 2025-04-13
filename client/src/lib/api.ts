import API from "../config/apiClient";
import { LoginParams } from "../pages/login";
import { RegisterParams } from "../pages/register";

export const login = async (data: LoginParams) => API.post("/auth/login", data);
export const register = async (data: RegisterParams) =>
  API.post("/auth/register", data);

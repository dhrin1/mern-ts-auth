import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  logoutHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.post("/logout", logoutHandler);

export default authRoutes;

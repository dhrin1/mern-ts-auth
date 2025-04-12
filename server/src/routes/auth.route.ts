import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  logoutHandler,
  refreshHandler,
  verifyEmailHandler,
  sendPasswordResendHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.post("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResendHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

export default authRoutes;

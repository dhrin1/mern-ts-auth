import catchErrors from "../utils/catchErrors";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmaill,
  verifyEmail,
} from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/https";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import {
  registerSchema,
  loginSchema,
  verificationCodeSchema,
  emailSchema,
  resetPasswordSchema,
} from "./auth.schema";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successful.",
  });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.acceeToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");
  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res).status(OK).json({
    message: "Logout successful.",
  });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );

  if (refreshToken) {
    res.cookie("refreshToken", newRefreshToken, getAccessTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({
      message: "Access token refreshed",
    });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);
  await verifyEmail(verificationCode);

  return res.status(OK).json({
    message: "Email was successfully verified",
  });
});

export const sendPasswordResendHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendPasswordResetEmaill(email);

  return res.status(OK).json({
    message: "Password reset emails sent",
  });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await resetPassword(request);

  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successfully",
  });
});

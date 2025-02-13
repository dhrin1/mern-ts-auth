import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import VeriricationCodeType from "../constants/verficiationCodeType";
import { oneYearFromNow } from "../utils/date";
import SessionModel from "../models/model.session";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await UserModel.exists({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VeriricationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    { audience: ["user"], expiresIn: "30d" }
  );

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    { audience: ["user"], expiresIn: "15min" }
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/https";
import { z } from "zod";
import AppError from "../utils/AppError";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`PATH: ${req.path}`, error);
  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  }
  if (error instanceof AppError) {
    handleAppError(res, error);
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: "Internal server error" });
};

export default errorHandler;

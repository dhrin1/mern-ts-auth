import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/https";
import { z } from "zod";

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

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`PATH: ${req.path}`, error);
  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  }
  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
};

export default errorHandler;

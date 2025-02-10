import { NextFunction, Request, Response } from "express";

type AsyncContoller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchErrors =
  (controller: AsyncContoller): AsyncContoller =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchErrors;

import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const zodErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.errors[0].message });
  } else {
    next(err);
  }
};

import { ErrorRequestHandler } from "express";

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  console.error(err);
  return res.status(500).json({ message: "Oops, something happened!" });
};

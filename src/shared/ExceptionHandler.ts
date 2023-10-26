import { Request, Response, NextFunction } from "express";

/** Infrastructure : error handler for expressjs */
export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // log to console
  console.error(err);

  // standard default error response
  res.status(500).json({ error: true, message: err.message });
}

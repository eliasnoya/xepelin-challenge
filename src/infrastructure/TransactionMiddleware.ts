import { Request, Response, NextFunction } from "express";

export default function BigDepositMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.amount >= 10000) {
    console.log(
      "More than U$D 10,000 deposit requested for accountId: ",
      req.body.account_id
    );
  }

  next();
}

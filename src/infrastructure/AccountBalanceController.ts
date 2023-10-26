import { Request, Response } from "express";
import AccountGetterService from "../application/AccountGetterService";

export default class AccountBalanceController {
  /**
   * comment: all controllers at infrastructure level injects service from application level
   */
  constructor(private readonly accountGetterService: AccountGetterService) {}

  /**
   * comment: Implementation of AccountCreatorService use-case as a callback compatible with Expressjs route
   */
  run(req: Request, res: Response) {
    const account = this.accountGetterService.execute(req.params.id);

    if (!account) {
      res.status(404).send();
    } else {
      res.status(200).json({
        account_id: account.id,
        balance: account.getBalance(),
      });
    }
  }
}

import { Request, Response } from "express";
import TransactionService from "../application/TransactionService";
import BalanceUpdateEventHandler from "./BalanceUpdateEventHandler";
import TransactionEventHandler from "./TransactionEventHandler";

export default class TransactionController {
  /**
   * comment: all controllers at infrastructure level injects service from application level
   */
  constructor(
    private readonly transactionService: TransactionService,
    private readonly balanceUpdateEventHandler: BalanceUpdateEventHandler,
    private readonly transactionEventHandler: TransactionEventHandler
  ) {}

  /**
   * comment: Implementation of AccountCreatorService use-case as a callback compatible with Expressjs route
   */
  run(req: Request, res: Response) {
    const result = this.transactionService.execute(
      req.body.type,
      req.body.account_id,
      req.body.amount
    );

    // account not found
    if (!result) {
      res.status(404);
    } else {
      const [transactionEvent, balanceUpdateEvent] = result;

      this.balanceUpdateEventHandler.publish(transactionEvent);
      this.transactionEventHandler.publish(balanceUpdateEvent);

      res.status(200).send(); // 200 ok
    }
  }
}

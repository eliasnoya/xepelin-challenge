import { Request, Response } from "express";
import AccountCreatorService from "../application/AccountCreatorService";
import AccountCreatorEventHandler from "./AccountCreatorEventHandler";

export default class AccountCreatorController {
  /**
   * comment: all controllers at infrastructure level injects service from application level
   */
  constructor(
    private readonly accountCreatorService: AccountCreatorService,
    private readonly accountCreatorEventHandler: AccountCreatorEventHandler
  ) {}

  /**
   * comment: Implementation of AccountCreatorService use-case as a callback compatible with Expressjs route
   */
  run(req: Request, res: Response) {
    const accountCreatedEvent = this.accountCreatorService.execute(
      req.body.name,
      req.body.number
    );

    this.accountCreatorEventHandler.publish(accountCreatedEvent);

    res.status(201).json({
      account_id: accountCreatedEvent.entity.getId(),
    });
  }
}

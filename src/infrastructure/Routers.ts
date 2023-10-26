import express from "express";

import {
  transactionController,
  accountCreatorController,
  accountBalanceController,
} from "./Controllers";
import BigDepositMiddleware from "./TransactionMiddleware";

const AccountsRouter = express.Router();

// [POST] /accounts
AccountsRouter.post(
  "/",
  accountCreatorController.run.bind(accountCreatorController)
);

// [POST] /accounts/{number}/balance
AccountsRouter.get(
  "/:id/balance",
  accountBalanceController.run.bind(accountBalanceController)
);

const TransactionRouter = express.Router();

// [POST] /transaction
TransactionRouter.post(
  "/",
  BigDepositMiddleware,
  transactionController.run.bind(transactionController)
);

export { AccountsRouter, TransactionRouter };

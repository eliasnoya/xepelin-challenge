import AccountCreatorController from "./AccountCreatorController";
import AccountCreatorService from "../application/AccountCreatorService";
import AccountCreatorEventHandler from "./AccountCreatorEventHandler";
import AccountMemoryRepository from "./AccountMemoryRespository";
import AccountGetterService from "../application/AccountGetterService";
import AccountBalanceController from "./AccountBalanceController";
import TransactionService from "../application/TransactionService";
import TransactionEventHandler from "./TransactionEventHandler";
import BalanceUpdateEventHandler from "./BalanceUpdateEventHandler";
import TransactionController from "./TransactionController";

// Account Creator controller
let accountMemoryRepository = new AccountMemoryRepository();
let accountCreatorService = new AccountCreatorService();
let accountCreatorEventHandler = new AccountCreatorEventHandler();

let accountCreatorController = new AccountCreatorController(
  accountCreatorService,
  accountCreatorEventHandler
);

// Account Getter Controller
const accountGetterService = new AccountGetterService(accountMemoryRepository);
const accountBalanceController = new AccountBalanceController(
  accountGetterService
);

// Transaction Controller
const transactionService = new TransactionService(accountMemoryRepository);
const transactionEventHandler = new TransactionEventHandler();
const balanceUpdateEventHandler = new BalanceUpdateEventHandler();
const transactionController = new TransactionController(
  transactionService,
  transactionEventHandler,
  balanceUpdateEventHandler
);

export {
  accountCreatorController,
  accountBalanceController,
  transactionController,
};

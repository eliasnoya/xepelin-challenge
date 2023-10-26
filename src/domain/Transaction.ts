import TransactionTypes from "./TransactionTypes";

export default class Transaction {
  constructor(
    public accountId: string,
    public transactionType: TransactionTypes,
    public amount: number
  ) {
    this.validate();
  }

  // example business rules
  validate() {
    if (this.transactionType === TransactionTypes.D && this.amount <= 0) {
      throw Error("Deposit must be positive");
    }

    if (this.transactionType === TransactionTypes.W && this.amount >= 0) {
      throw Error("Withdraw must be negative");
    }
  }
}

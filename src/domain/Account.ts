import AccountCreateEvent from "./AccountCreateEvent";
import Transaction from "./Transaction";
import TransactionEvent from "./TransactionEvent";
import TransactionTypes from "./TransactionTypes";

/**
 * Object-value Entity
 */
export default class Account {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly number: number,
    public balance: number = 0
  ) {
    this.validate();
  }

  // example business rules
  protected validate() {
    if (!this.name || this.name.length < 3) {
      throw Error("Name cannot be empty or have fewer than 3 characters");
    }

    if (!this.number || this.number < 1) {
      throw Error("Number cannot be empty or less than 1");
    }
  }

  public create(): AccountCreateEvent {
    return new AccountCreateEvent(this);
  }

  public withdraw(amount: number): TransactionEvent {
    if (this.balance < Math.abs(amount)) {
      throw Error("You dont have enogth money to do this withdraw");
    }
    return new TransactionEvent(
      new Transaction(this.id, TransactionTypes.W, amount)
    );
  }

  public deposit(amount: number): TransactionEvent {
    return new TransactionEvent(
      new Transaction(this.id, TransactionTypes.D, amount)
    );
  }

  public getBalance(): number {
    return this.balance;
  }

  public getId(): string {
    return this.id;
  }

  public setBalance(balance: number) {
    this.balance = balance;
  }
}

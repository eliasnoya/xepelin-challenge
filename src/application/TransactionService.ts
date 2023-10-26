import AccountRepository from "../domain/AccountRepository";
import AccountTransactionEvent from "../domain/TransactionEvent";
import BalanceUpdateEvent from "../domain/BalanceUpdateEvent";
import TransactionTypes from "../domain/TransactionTypes";

/**
 * Use case: "Create a new account"
 */
export default class TransactionService {
  constructor(readonly accountRepository: AccountRepository) {}

  execute(
    type: TransactionTypes,
    accountId: string,
    amount: number
  ): [AccountTransactionEvent, BalanceUpdateEvent] | false {
    const account = this.accountRepository.find(accountId);

    if (!account) {
      return false;
    }

    const transactionEvent =
      type == TransactionTypes.D
        ? account.deposit(amount)
        : account.withdraw(amount);
    const balanceUpdateEvent = new BalanceUpdateEvent({ accountId, amount });

    return [transactionEvent, balanceUpdateEvent];
  }
}

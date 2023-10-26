import Account from "../domain/Account";
import AccountRepository from "../domain/AccountRepository";
import { Database } from "../shared/Stores";

export default class AccountMemoryRepository implements AccountRepository {
  find(accountId: string): Account | false {
    const account = Database.find((account) => account.id === accountId);
    return !account ? false : account;
  }

  store(account: Account) {
    Database.push(account);
  }

  updateBalance(id: string, balance: number) {
    const account = this.find(id);
    if (account) {
      account.balance += balance;
    }
  }
}

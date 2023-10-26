import Account from "./Account";

export default interface AccountRepository {
  find(id: string): Account | false;
  store(account: Account): void;
  updateBalance(id: string, amount: number): void;
}

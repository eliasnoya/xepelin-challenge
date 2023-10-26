import Account from "../domain/Account";
import AccountRepository from "../domain/AccountRepository";

/**
 * Use case: "Create a new account"
 */
export default class AccountGetterService {
  constructor(readonly accountRepository: AccountRepository) {}

  execute(accountId: string): Account | false {
    return this.accountRepository.find(accountId);
  }
}

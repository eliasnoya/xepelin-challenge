import Account from "../domain/Account";
import AccountCreateEvent from "../domain/AccountCreateEvent";
import { v4 } from "uuid";

/**
 * Use case: "Create a new account"
 */
export default class AccountCreatorService {
  execute(name: string, number: number): AccountCreateEvent {
    return new Account(v4(), name, number).create();
  }
}

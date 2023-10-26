import Event from "../shared/Event";
import Account from "./Account";

/**
 * Event
 */
export default class AccountCreateEvent extends Event {
  constructor(public entity: Account) {
    super("create_account", entity, "PENDING");
  }
}

import Event from "../shared/Event";
import Transaction from "./Transaction";

/**
 * Event
 */
export default class TransactionEvent extends Event {
  constructor(public entity: Transaction) {
    super("create_transaction", entity, "PENDING");
  }
}

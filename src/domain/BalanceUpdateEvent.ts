import Event from "../shared/Event";

/**
 * Event
 */
export default class BalanceUpdateEvent extends Event {
  constructor(public entity: BalanceMovement) {
    super("update_balance", entity, "PENDING");
  }
}

import BalanceUpdateEvent from "../domain/BalanceUpdateEvent";
import InMemoryEventCaster from "../shared/InMemoryEventCaster";
import AccountMemoryRepository from "./AccountMemoryRespository";

export default class BalanceUpdateEventHandler extends InMemoryEventCaster {
  constructor() {
    super();
    // suscribe on this event a callback to store inmemory database
    this.subscribe(function (event: BalanceUpdateEvent) {
      new AccountMemoryRepository().updateBalance(
        event.entity.accountId,
        event.entity.amount
      );
    });
  }
}

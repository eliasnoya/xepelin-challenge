import AccountCreateEvent from "../domain/AccountCreateEvent";
import InMemoryEventCaster from "../shared/InMemoryEventCaster";
import AccountMemoryRepository from "./AccountMemoryRespository";

export default class AccountCreatorEventHandler extends InMemoryEventCaster {
  constructor() {
    super();
    // suscribe on this event a callback to store inmemory database
    this.subscribe(function (event: AccountCreateEvent) {
      new AccountMemoryRepository().store(event.entity);
    });
  }
}

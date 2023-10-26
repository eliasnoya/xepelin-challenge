import TransactionEvent from "../domain/TransactionEvent";
import InMemoryEventCaster from "../shared/InMemoryEventCaster";
import TransactionMemoryRepository from "./TransactionMemoryRepository";

export default class TransactionEventHandler extends InMemoryEventCaster {
  constructor() {
    super();
    // AccountCreateEvent stores Account entity to database
    this.subscribe(function (event: TransactionEvent) {
      new TransactionMemoryRepository().store(event.entity);
    });
  }
}

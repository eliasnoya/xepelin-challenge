import Event from "./Event";
import { EventStore } from "./Stores";

/** Infrastructure shared */
export default class InMemoryEventCaster {
  private subscribers: ((event: Event) => void)[] = [];

  subscribe(subscriber: (event: Event) => void) {
    this.subscribers.push(subscriber);
  }

  publish(event: Event) {
    // here u can validate, state rollback, etc
    EventStore.push(event);
    event.status = "PUBLISHED";

    // broadcast event to all suscriptrs
    this.subscribers.forEach((subscriber) => subscriber(event));
  }
}

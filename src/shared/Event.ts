/**
 * domain shared -> reduced event structure
 */
export default class Event {
  timestamp: string;
  response: any;

  constructor(public name: string, public entity: any, public status: string) {
    this.timestamp = Date();
    this.response = null;
  }
}

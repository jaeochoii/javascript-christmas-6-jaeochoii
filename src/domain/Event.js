import Date from "./Date.js";
import NUMBER from "../constant/Number.js";

class Event {
  #event;

  constructor(date) {
    this.#event = new Array(5).fill(0);
    this.#dDayHandler(new Date(date).getDate());
  }

  #dDayHandler(date) {
    this.#event[0] += date;
    this.#isWeekend(date);
  }

  #isWeekend(date) {
    date % NUMBER.dateLength === NUMBER.friRemainder ||
    date % NUMBER.dateLength === NUMBER.satRemainder
      ? this.#weekendHandler()
      : this.#weekHandler(date);
  }

  #weekendHandler() {
    this.#event[1] += 1;
    this.getEvent();
  }

  #weekHandler(date) {
    this.#event[2] += 1;
    if (
      date % NUMBER.dateLength === NUMBER.specialRemainder ||
      date === NUMBER.christmas
    )
      this.#event[3] += 1;
    this.getEvent();
  }

  getEvent() {
    return this.#event;
  }
}

export default Event;

import Date from "./Date.js";
import NUMBER from "../constant/Number.js";

class Event {
  #date;
  #eventList;

  constructor(date) {
    this.#date = new Date(date);
    this.#eventList = new Array(NUMBER.benefitListLength).fill(0);
    this.#dDayHandler();
  }

  #dDayHandler() {
    this.#eventList[NUMBER.dDayIndex] += this.#date.getDate();
    this.#date.isDateWeekend()
      ? this.#weekendHandler()
      : this.#weekHandler(this.#date.getDate());
  }

  #weekendHandler() {
    this.#eventList[NUMBER.weekendIndex] += 1;
    this.getEvent();
  }

  #weekHandler(date) {
    this.#eventList[NUMBER.weekIndex] += 1;
    if (
      date % NUMBER.dateLength === NUMBER.specialRemainder ||
      date === NUMBER.christmas
    )
      this.#eventList[NUMBER.specialIndex] += 1;
    this.getEvent();
  }

  getEvent() {
    return this.#eventList;
  }
}

export default Event;

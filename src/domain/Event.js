import Date from "./Date.js";
import NUMBER from "../constant/Number.js";

class Event {
  #date;
  #eventList;

  constructor(date) {
    this.#date = new Date(date);
    this.#eventList = new Array(5).fill(0);
    this.#dDayHandler();
  }

  #dDayHandler() {
    this.#eventList[0] += this.#date.getDate();
    this.#date.isDateWeekend()
      ? this.#weekendHandler()
      : this.#weekHandler(this.#date.getDate());
  }

  #weekendHandler() {
    this.#eventList[1] += 1;
    this.getEvent();
  }

  #weekHandler(date) {
    this.#eventList[2] += 1;
    if (
      date % NUMBER.dateLength === NUMBER.specialRemainder ||
      date === NUMBER.christmas
    )
      this.#eventList[3] += 1;
    this.getEvent();
  }

  getEvent() {
    return this.#eventList;
  }
}

export default Event;

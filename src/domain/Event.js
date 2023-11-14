import VisitDate from "./VisitDate.js";
import NUMBER from "../constant/Number.js";

class Event {
  #date;
  #eventList;

  constructor(date) {
    this.#date = new VisitDate(date);
    this.#eventList = new Array(NUMBER.benefitListLength).fill(0);
    this.#dDayHandler();
  }

  #dDayHandler() {
    this.#eventList[NUMBER.dDayIndex] += this.#date.getVisitDate();
    this.#date.isDateWeekend()
      ? this.#weekendHandler()
      : this.#weekHandler(this.#date.getVisitDate());
  }

  #weekendHandler() {
    this.#eventList[NUMBER.weekendIndex] += 1;
    this.getEvent();
  }

  #weekHandler() {
    this.#eventList[NUMBER.weekIndex] += 1;
    if (this.#date.isDateSpecial()) this.#eventList[NUMBER.specialIndex] += 1;
  }

  getEvent() {
    return this.#eventList;
  }
}

export default Event;

import NUMBER from "../constant/Number.js";

class VisitDate {
  #date;

  constructor(date) {
    this.#date = Number(date);
  }

  isDateWeekend() {
    if (
      this.#date % NUMBER.dateLength === NUMBER.friRemainder ||
      this.#date % NUMBER.dateLength === NUMBER.satRemainder
    )
      return true;
  }

  getVisitDate() {
    return this.#date;
  }
}

export default VisitDate;

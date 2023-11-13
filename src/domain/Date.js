import NUMBER from "../constant/Number.js";

class Date {
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

  getDate() {
    return this.#date;
  }
}

export default Date;

class Date {
  #date;

  constructor(date) {
    this.#date = Number(date);
  }

  getDate() {
    return this.#date;
  }
}

export default Date;

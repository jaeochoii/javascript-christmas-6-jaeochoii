import MENU from "../constant/Menu.js";
import NUMBER from "../constant/Number.js";

class BenefitAmount {
  #benefitList;
  #benefitAmount;
  #totalAmount;

  // menus: 객체
  constructor(menus, benefitList, totalAmount) {
    this.#benefitList = benefitList;
    this.#totalAmount = totalAmount;
    this.#benefitAmount = [];
    this.#calculateGiveaway(totalAmount);
    this.#calculateDDayAmount();
    this.#benefitList[NUMBER.weekendEventIndex] === 1
      ? this.#calculateWeekendAmount(menus)
      : this.#calculateWeekAmount(menus);
  }

  #calculateGiveaway(cost) {
    cost >= NUMBER.giveawayStandard
      ? (this.#benefitAmount[NUMBER.giveawayEventIndex] = NUMBER.champagne)
      : (this.#benefitAmount[NUMBER.giveawayEventIndex] = 0);
  }

  #calculateDDayAmount() {
    this.#benefitList[NUMBER.dDayEventIndex] <= NUMBER.christmas
      ? (this.#benefitAmount[NUMBER.dDayEventIndex] =
          NUMBER.dDayDefaultDiscount +
          (this.#benefitList[NUMBER.dDayEventIndex] - 1) *
            NUMBER.dDayPlusDiscount)
      : (this.#benefitAmount[NUMBER.dDayEventIndex] = 0);
  }

  #calculateWeekendAmount(menus) {
    this.#benefitAmount[NUMBER.weekEventIndex] = 0;
    this.#benefitAmount[NUMBER.specialEventIndex] = 0;
    const benefitAmount = Object.keys(menus).reduce((acc, order) => {
      if (MENU.main.some((menu) => menu.name === order)) {
        return acc + menus[order];
      }
      return acc;
    }, 0);
    this.#benefitAmount[1] = NUMBER.dateDiscount * benefitAmount;
  }

  #calculateWeekAmount(menus) {
    this.#benefitAmount[NUMBER.weekendEventIndex] = 0;
    const benefitAmount = Object.keys(menus).reduce((acc, order) => {
      if (MENU.dessert.some((menu) => menu.name === order)) {
        return acc + menus[order];
      }
      return acc;
    }, 0);
    this.#benefitAmount[NUMBER.weekEventIndex] =
      NUMBER.dateDiscount * benefitAmount;
    this.#benefitList[NUMBER.specialEventIndex] === 0
      ? (this.#benefitAmount[NUMBER.specialEventIndex] = 0)
      : (this.#benefitAmount[NUMBER.specialEventIndex] =
          NUMBER.specialDiscount);
  }

  getBenefitList() {
    if (this.#totalAmount < NUMBER.benefitStandard) this.#benefitAmount.fill(0);
    return this.#benefitAmount;
  }

  getBenefitAmount() {
    return this.getBenefitList().reduce((acc, cost) => {
      return acc + cost;
    }, 0);
  }
}

export default BenefitAmount;

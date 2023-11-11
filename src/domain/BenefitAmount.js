import MENU from "../constant/Menu.js";
import NUMBER from "../constant/Number.js";

class BenefitAmount {
  #benefitList;
  #benefitAmount;

  // menus: 객체
  constructor(menus, benefitList, totalAmount) {
    this.#benefitList = benefitList;
    this.#benefitAmount = [];
    this.#calculateIsGiveaway(totalAmount);
    this.#calculateDDayAmount();
    this.#benefitList[1] === 1
      ? this.#calculateWeekendAmount(menus)
      : this.#calculateWeekAmount(menus);
  }
  #calculateIsGiveaway(cost) {
    cost >= NUMBER.giveawayStandard
      ? (this.#benefitAmount[4] = NUMBER.champagne)
      : (this.#benefitAmount[4] = 0);
  }

  #calculateDDayAmount() {
    const benefitAmount =
      NUMBER.dDayDefaultDiscount +
      (this.#benefitList[0] - 1) * NUMBER.dDayPlusDiscount;
    this.#benefitAmount[0] = benefitAmount;
  }

  #calculateWeekendAmount(menus) {
    this.#benefitAmount[2] = 0;
    this.#benefitAmount[3] = 0;
    const benefitAmount = Object.keys(menus).reduce((acc, order) => {
      if (MENU.main.some((menu) => menu.name === order)) {
        return acc + menus[order];
      }
      return acc;
    }, 0);
    this.#benefitAmount[1] = NUMBER.dateDiscount * benefitAmount;
  }

  #calculateWeekAmount(menus) {
    this.#benefitAmount[1] = 0;
    const benefitAmount = Object.keys(menus).reduce((acc, order) => {
      if (MENU.dessert.some((menu) => menu.name === order)) {
        return acc + menus[order];
      }
      return acc;
    }, 0);
    this.#benefitAmount[2] = NUMBER.dateDiscount * benefitAmount;
    this.#benefitList[3] === 0
      ? (this.#benefitAmount[3] = 0)
      : (this.#benefitAmount[3] = NUMBER.specialDiscount);
  }

  getBenefitList() {
    return this.#benefitAmount;
  }

  getBenefitAmount() {
    return this.#benefitAmount.reduce((acc, cost) => {
      return acc + cost;
    }, 0);
  }
}

export default BenefitAmount;

import MENU from "../constant/Menu.js";
import NUMBER from "../constant/Number.js";

class BenefitAmount {
  #benefitList;
  #totalAmount;

  /**
   * @param Object props { menus: 메뉴 객체, benefitList: 이벤트 배열, totalAmount: 구매 총액 }
   */
  constructor(props) {
    this.#benefitList = props.benefitList;
    this.#totalAmount = props.totalAmount;
    this.#calculateGiveaway(props.totalAmount);
    this.#calculateDDayAmount();
    this.#benefitList[NUMBER.weekendIndex]
      ? this.#calculateWeekendAmount(props.menus)
      : this.#calculateWeekAmount(props.menus);
  }

  #calculateGiveaway(cost) {
    cost >= NUMBER.giveawayStandard
      ? (this.#benefitList[NUMBER.giveawayIndex] = NUMBER.champagne)
      : (this.#benefitList[NUMBER.giveawayIndex] = 0);
  }

  #calculateDDayAmount() {
    this.#benefitList[NUMBER.dDayIndex] <= NUMBER.christmas
      ? (this.#benefitList[NUMBER.dDayIndex] =
          NUMBER.dDayDefaultDiscount +
          (this.#benefitList[NUMBER.dDayIndex] - 1) * NUMBER.dDayPlusDiscount)
      : (this.#benefitList[NUMBER.dDayIndex] = 0);
  }

  #calculateWeekendAmount(menus) {
    this.#benefitList[NUMBER.weekIndex] = 0;
    this.#benefitList[NUMBER.specialIndex] = 0;
    const benefitAmount = Object.keys(menus).reduce((acc, order) => {
      if (MENU.main.some((menu) => menu.name === order)) {
        return acc + menus[order];
      }
      return acc;
    }, 0);
    this.#benefitList[NUMBER.weekendIndex] =
      NUMBER.dateDiscount * benefitAmount;
  }

  #calculateWeekAmount(menus) {
    this.#benefitList[NUMBER.weekendIndex] = 0;
    const benefitAmount = Object.keys(menus).reduce((acc, order) => {
      if (MENU.dessert.some((menu) => menu.name === order)) {
        return acc + menus[order];
      }
      return acc;
    }, 0);
    this.#benefitList[NUMBER.weekIndex] = NUMBER.dateDiscount * benefitAmount;
    this.#benefitList[NUMBER.specialIndex] === 0
      ? (this.#benefitList[NUMBER.specialIndex] = 0)
      : (this.#benefitList[NUMBER.specialIndex] = NUMBER.specialDiscount);
  }

  getBenefitList() {
    if (this.#totalAmount < NUMBER.benefitStandard) this.#benefitList.fill(0);
    return this.#benefitList;
  }

  getBenefitAmount() {
    return this.getBenefitList().reduce((acc, cost) => {
      return acc + cost;
    }, 0);
  }
}

export default BenefitAmount;

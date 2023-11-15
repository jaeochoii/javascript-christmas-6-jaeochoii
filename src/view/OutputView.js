import { Console } from "@woowacourse/mission-utils";
import MESSAGE from "../constant/Message.js";
import BENEFIT_RESULT from "../constant/BenefitResult.js";
import RangeFilter from "../utils/RangeFilter.js";
import UNIT from "../constant/Unit.js";

const OutputView = {
  printIntro() {
    Console.print(MESSAGE.intro);
  },

  printPreview(date) {
    Console.print(`${MESSAGE.previewPrefix} ${date}${MESSAGE.previewSuffix}`);
  },

  printOrderMenus(menus) {
    Console.print(MESSAGE.order);
    for (const [menu, count] of Object.entries(menus)) {
      Console.print(`${menu} ${count}${UNIT.countSuffix}`);
    }
    Console.print(MESSAGE.line);
  },

  printBeforeDiscount(cost) {
    Console.print(MESSAGE.beforeDiscount);
    Console.print(`${this.formatCurrency(cost)}${UNIT.priceSuffix}`);
    Console.print(MESSAGE.line);
  },

  printGiveawayMenus(count) {
    Console.print(MESSAGE.giveawayMenu);
    count === 0
      ? Console.print(`${MESSAGE.none}`)
      : Console.print(`${MESSAGE.champagne} ${count}${UNIT.countSuffix}`);
    Console.print(MESSAGE.line);
  },

  printBenefitList(discountList) {
    Console.print(MESSAGE.benefitList);
    discountList.every((count) => count === 0)
      ? Console.print(MESSAGE.none)
      : this.processPrintBenefit(discountList);
    Console.print(MESSAGE.line);
  },

  printBenefitAccount(cost) {
    Console.print(MESSAGE.benefitAccount);
    Console.print(
      `${UNIT.minus}${this.formatCurrency(cost)}${UNIT.priceSuffix}`
    );
    Console.print(MESSAGE.line);
  },

  printAfterDiscount(cost) {
    Console.print(MESSAGE.afterDiscount);
    Console.print(`${this.formatCurrency(cost)}${UNIT.priceSuffix}`);
    Console.print(MESSAGE.line);
  },

  printBadge(cost) {
    Console.print(MESSAGE.eventBadge);
    RangeFilter.badge(cost)
      ? Console.print(`${RangeFilter.badge(cost)}`)
      : Console.print(MESSAGE.none);
  },

  formatCurrency(cost) {
    return String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  processPrintBenefit(discountList) {
    BENEFIT_RESULT.forEach((benefit, index) => {
      if (discountList[index] !== 0) {
        Console.print(
          `${benefit} ${UNIT.minus}${this.formatCurrency(discountList[index])}${
            UNIT.priceSuffix
          }`
        );
      }
    });
  },
};

export default OutputView;

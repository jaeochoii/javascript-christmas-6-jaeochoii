import { Console } from "@woowacourse/mission-utils";
import MESSAGE from "../constant/Message.js";
import BENEFIT_RESULT from "../constant/BenefitResult.js";
import FormatCurrency from "../utils/FormatCurrency.js";
import RangeFilter from "../utils/RangeFilter.js";

// 입력값이 없다면 없음으로 출력하는 기능 추후에 생성

const OutputView = {
  printIntro() {
    Console.print(MESSAGE.intro);
  },

  printPreview(date) {
    Console.print(`${MESSAGE.previewPrefix} ${date}${MESSAGE.previewSuffix}`);
  },

  // menus : 입력받은 메뉴와 개수 객체
  printOrderMenus(menus) {
    Console.print(MESSAGE.order);
    for (const [menu, count] of Object.entries(menus)) {
      Console.print(`${menu} ${count}${MESSAGE.countSuffix}`);
    }
  },

  printBeforeDiscount(cost) {
    Console.print(MESSAGE.beforeDiscount);
    Console.print(`${FormatCurrency(cost)}${MESSAGE.priceSuffix}`);
  },

  printGiveawayMenus(count) {
    Console.print(MESSAGE.giveawayMenu);
    Console.print(`${MESSAGE.champagne} ${count}${MESSAGE.countSuffix}`);
  },

  printBenefitList(discountList) {
    Console.print(MESSAGE.benefitList);
    BENEFIT_RESULT.forEach((benefit, index) => {
      if (discountList[index] !== 0) {
        Console.print(
          `${benefit} ${MESSAGE.benefit}${FormatCurrency(discountList[index])}${
            MESSAGE.priceSuffix
          }`
        );
      }
    });
  },

  printBenefitAccount(cost) {
    Console.print(MESSAGE.benefitAccount);
    Console.print(
      `${MESSAGE.benefit}${FormatCurrency(cost)}${MESSAGE.priceSuffix}`
    );
  },

  printAfterDiscount(cost) {
    Console.print(MESSAGE.afterDiscount);
    Console.print(`${FormatCurrency(cost)}${MESSAGE.priceSuffix}`);
  },

  printBadge(cost) {
    Console.print(MESSAGE.eventBadge);
    Console.print(`${RangeFilter.badge(cost)}`);
  },
};

export default OutputView;

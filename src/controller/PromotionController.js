import Event from "../domain/Event.js";
import Order from "../domain/Order.js";
import TotalAmount from "../domain/TotalAmount.js";
import BenefitAmount from "../domain/BenefitAmount.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import { Console } from "@woowacourse/mission-utils";
import NUMBER from "../constant/Number.js";

class PromotionController {
  constructor() {}

  async playPromotion() {
    OutputView.printIntro();
    const event = new Event(await this.#inputVisitDate());
    const date = event.getEvent()[NUMBER.dDayIndex];
    const order = new Order(await this.#inputOrder()).getOrder();
    const totalAmount = new TotalAmount(order);
    OutputView.printPreview(date);
    this.#displayOrderedMenus({ date, order, totalAmount });
    this.#displayBenefit({ order, event, totalAmount });
  }

  async #inputVisitDate() {
    while (true) {
      try {
        return await InputView.readDate();
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async #inputOrder() {
    while (true) {
      try {
        return await InputView.readOrder();
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  #displayOrderedMenus({ date, order, totalAmount }) {
    OutputView.printPreview(date);
    OutputView.printOrderMenus(order);
    OutputView.printBeforeDiscount(totalAmount.getTotalAmount());
    OutputView.printGiveawayMenus(totalAmount.getGiveawayCount());
  }

  #displayBenefit({ order, event, totalAmount }) {
    const benefit = this.#createBenefitObject({ order, event, totalAmount });
    const benefitList = benefit.getBenefitList();
    const benefitAmount = benefit.getBenefitAmount();
    const discountCost = totalAmount.getTotalAmount() - benefitAmount;

    OutputView.printBenefitList(benefitList);
    OutputView.printBenefitAccount(benefitAmount);
    OutputView.printAfterDiscount(discountCost);
    OutputView.printBadge(benefitAmount);
  }

  #createBenefitObject({ order, event, totalAmount }) {
    return new BenefitAmount({
      order,
      benefitList: event.getEvent(),
      totalAmount,
    });
  }
}

export default PromotionController;

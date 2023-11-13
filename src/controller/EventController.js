import Date from "../domain/Date.js";
import Event from "../domain/Event.js";
import Menus from "../domain/Menus.js";
import TotalAmount from "../domain/TotalAmount.js";
import BenefitAmount from "../domain/BenefitAmount.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import { Console } from "@woowacourse/mission-utils";

class EventController {
  constructor() {}

  async playEvent() {
    OutputView.printIntro();
    const date = new Date(await this.inputVisitDate()).getDate();
    const event = new Event(date);
    const menus = new Menus(await this.inputMenus()).getMenus();
    const totalAmount = new TotalAmount(menus);
    OutputView.printPreview(date);
    this.displayOrderedMenus({ date, menus, totalAmount });
    this.displayBenefit({ menus, event, totalAmount });
  }

  async inputVisitDate() {
    while (true) {
      try {
        return await InputView.readDate();
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async inputMenus() {
    while (true) {
      try {
        return await InputView.readMenus();
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  displayOrderedMenus({ date, menus, totalAmount }) {
    OutputView.printPreview(date);
    OutputView.printOrderMenus(menus);
    OutputView.printBeforeDiscount(totalAmount.getTotalAmount());
    OutputView.printGiveawayMenus(totalAmount.getGiveawayCount());
  }

  displayBenefit({ menus, event, totalAmount }) {
    const benefit = this.createBenefitObject({ menus, event, totalAmount });
    const benefitList = benefit.getBenefitList();
    const benefitAmount = benefit.getBenefitAmount();
    const costAfterDiscount = totalAmount.getTotalAmount() - benefitAmount;

    OutputView.printBenefitList(benefitList);
    OutputView.printBenefitAccount(benefitAmount);
    OutputView.printAfterDiscount(costAfterDiscount);
    OutputView.printBadge(benefitAmount);
  }

  createBenefitObject({ menus, event, totalAmount }) {
    return new BenefitAmount({
      menus,
      benefitList: event.getEvent(),
      totalAmount,
    });
  }
}

export default EventController;

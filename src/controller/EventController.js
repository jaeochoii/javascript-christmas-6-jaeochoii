import Date from "../domain/Date.js";
import Event from "../domain/Event.js";
import Menus from "../domain/Menus.js";
import TotalAmount from "../domain/TotalAmount.js";
import BenefitAmount from "../domain/BenefitAmount.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import { Console } from "@woowacourse/mission-utils";

class EventController {
  #date;
  #event;
  #menus;

  constructor() {}

  async playEvent() {
    OutputView.printIntro();
    this.#date = new Date(await this.inputVisitDate()).getDate();
    this.#event = new Event(this.#date);
    this.#menus = new Menus(await this.inputMenus()).getMenus();
    this.displayPreview();
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

  displayPreview() {
    OutputView.printPreview(this.#date);
    OutputView.printOrderMenus(this.#menus);
    const totalAmount = new TotalAmount(this.#menus);
    OutputView.printBeforeDiscount(totalAmount.getTotalAmount());
    OutputView.printGiveawayMenus(totalAmount.getGiveawayCount());
    const benefit = new BenefitAmount({
      menus: this.#menus,
      benefitList: this.#event.getEvent(),
      totalAmount: totalAmount,
    });
    OutputView.printBenefitList(benefit.getBenefitList());
    OutputView.printBenefitAccount(benefit.getBenefitAmount());
    const cost = totalAmount.getTotalAmount() - benefit.getBenefitAmount();
    OutputView.printAfterDiscount(cost);
    OutputView.printBadge(benefit.getBenefitAmount());
  }
}

export default EventController;

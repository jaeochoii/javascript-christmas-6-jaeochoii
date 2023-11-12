import Date from "../domain/Date.js";
import Event from "../domain/Event.js";
import Menus from "../domain/Menus.js";
import TotalAmount from "../domain/TotalAmount.js";
import BenefitAmount from "../domain/BenefitAmount.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import NUMBER from "../constant/Number.js";
import { Console } from "@woowacourse/mission-utils";

class EventController {
  #date;
  #event;
  #menus;
  #totalAmount;
  #benefit;

  constructor() {}

  async playEvent() {
    OutputView.printIntro();
    try {
      await this.inputVisitDate();
    } catch (error) {
      Console.print(error.message);
      await this.inputVisitDate();
    }
  }

  async inputVisitDate() {
    const date = await InputView.readDate();
    this.#date = new Date(date).getDate();
    this.#event = new Event(this.#date);
    try {
      await this.inputMenus();
    } catch (error) {
      Console.print(error.message);
      await this.inputMenus();
    }
  }

  async inputMenus() {
    const menus = await InputView.readMenus();
    this.#menus = new Menus(menus).getMenus();
    this.displayPreview();
  }

  displayPreview() {
    OutputView.printPreview(this.#date);
    this.displayOrderedMenus();
  }

  displayOrderedMenus() {
    OutputView.printOrderMenus(this.#menus);
    this.displayBeforeDiscount();
  }

  displayBeforeDiscount() {
    this.#totalAmount = new TotalAmount(this.#menus).getTotalAmount();
    OutputView.printBeforeDiscount(this.#totalAmount);
    this.displayGiveawayMenu();
  }

  displayGiveawayMenu() {
    const count = Math.floor(this.#totalAmount / NUMBER.champagne);
    OutputView.printGiveawayMenus(count);
    this.displayBenefitList();
  }

  displayBenefitList() {
    this.#benefit = new BenefitAmount(
      this.#menus,
      this.#event.getEvent(),
      this.#totalAmount
    );
    OutputView.printBenefitList(this.#benefit.getBenefitList());
    this.displayBenefitAmount();
  }

  displayBenefitAmount() {
    OutputView.printBenefitAccount(this.#benefit.getBenefitAmount());
    this.displayAfterDiscount();
  }

  displayAfterDiscount() {
    const cost = this.#totalAmount - this.#benefit.getBenefitAmount();
    OutputView.printAfterDiscount(cost);
    this.displayEventBadge();
  }

  displayEventBadge() {
    OutputView.printBadge(this.#benefit.getBenefitAmount());
  }
}

export default EventController;

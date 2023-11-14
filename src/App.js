import PromotionController from "./controller/PromotionController.js";

class App {
  #promotion;

  constructor() {
    this.#promotion = new PromotionController();
  }

  async run() {
    await this.#promotion.playPromotion();
  }
}

export default App;

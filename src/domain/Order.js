import Validator from "../utils/Validator.js";

class Order {
  #order;

  constructor(order) {
    this.#order = {};
    order.split(",").forEach((menu) => {
      const [name, count] = menu.split("-");
      this.#order[name] = Number(count);
    });
    this.#validateMenus(this.#order);
  }

  #validateMenus(order) {
    Validator.orderMenus(order);
  }

  getOrder() {
    return this.#order;
  }
}

export default Order;

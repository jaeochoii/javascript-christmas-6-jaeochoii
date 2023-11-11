import Validator from "../utils/Validator.js";

class OrderedMenus {
  #menus;

  constructor(menus) {
    this.#menus = {};
    menus.split(",").forEach((menu) => {
      const [name, count] = menu.split("-");
      this.#menus[name] = Number(count);
    });
    this.#validateOrderedMenus(this.#menus);
  }

  #validateOrderedMenus(menus) {
    Validator.orderMenus(menus);
  }

  getOrderedMenus() {
    return this.#menus;
  }
}

export default OrderedMenus;

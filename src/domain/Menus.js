import Validator from "../utils/Validator.js";

class Menus {
  #menus;

  constructor(menus) {
    this.#menus = {};
    menus.split(",").forEach((menu) => {
      const [name, count] = menu.split("-");
      this.#menus[name] = Number(count);
    });
    this.#validateMenus(this.#menus);
  }

  #validateMenus(menus) {
    Validator.orderMenus(menus);
  }

  getMenus() {
    return this.#menus;
  }
}

export default Menus;

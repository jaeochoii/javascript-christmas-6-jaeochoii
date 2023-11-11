import MENU from "../constant/Menu.js";

class TotalAmount {
  #menu;
  #totalAmount;

  constructor(menus) {
    this.#totalAmount;
    this.#calculateAmount(menus);
  }

  // menus : 객체
  #calculateAmount(menus) {
    this.#menu = Object.values(MENU).flat();
    this.#totalAmount = Object.keys(menus).reduce((acc, menu) => {
      const menuName = this.#menu.find((menus) => menus.name === menu);
      return acc + menus[menu] * menuName.price;
    }, 0);
  }

  getTotalAmount() {
    return this.#totalAmount;
  }
}

export default TotalAmount;

import ERROR from "../constant/Error.js";
import MENU from "../constant/Menu.js";
import NUMBER from "../constant/Number.js";
import RangeFilter from "../utils/RangeFilter.js";

const Validator = {
  inputDate(input) {
    if (input.replace(/\d/g, "").length > 0) throw new Error(ERROR.date);
    if (RangeFilter.date(input)) throw new Error(ERROR.date);
  },

  inputOrder(input) {
    const pattern = /^([가-힣]+-\d+,)*[가-힣]+-\d+$/;
    const menus = input.split(",").map((menu) => menu.split("-")[0]);
    const counts = input.split(",").map((menu) => menu.split("-")[1]);
    if (!pattern.test(input)) throw new Error(ERROR.order);
    if (menus.length !== new Set(menus).size) throw new Error(ERROR.order);
    if (counts.some((count) => Number(count) < NUMBER.menuCountLimit))
      throw new Error(ERROR.order);
  },

  orderMenus(menus) {
    const drinks = MENU.drink.map((drink) => drink.name);
    if (Object.keys(menus).every((menu) => drinks.includes(menu)))
      throw new Error(ERROR.orderDrink);

    if (this.getMenusCount(menus) > NUMBER.menusMaxCount)
      throw new Error(ERROR.orderLimit);

    if (Object.keys(menus).some((menu) => !this.isFindMenu(menu)))
      throw new Error(ERROR.order);
  },

  getMenusCount(menus) {
    return Object.values(menus).reduce((acc, count) => {
      return acc + count;
    }, 0);
  },

  isFindMenu(input) {
    return Object.values(MENU)
      .flat()
      .some((menu) => menu.name === input);
  },
};

export default Validator;

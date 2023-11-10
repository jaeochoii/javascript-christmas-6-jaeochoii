import MENUS from "../constant/Menus.js";
import ERROR from "../constant/Error.js";
import NUMBER from "../constant/Number.js";
import RangeFilter from "../utils/RangeFilter.js";
import FindMenu from "./FindMenu.js";

const Validator = {
  inputDate(input) {
    if (input.replace(/\d/g, "").length > 0) throw new Error(ERROR.date);
    if (RangeFilter(input)) throw new Error(ERROR.date);
  },

  inputOrder(input) {
    const pattern = /^([가-힣]+-\d+,)*[가-힣]+-\d+$/;
    const menus = input.split(",").map((menu) => menu.split("-")[0]);
    const counts = input.split(",").map((menu) => menu.split("-")[1]);
    if (!pattern.test(input)) throw new Error(ERROR.order);
    if (menus.some((menu) => !FindMenu(menu))) throw new Error(ERROR.order);
    if (menus.length !== new Set(menus).size) throw new Error(ERROR.order);
    if (counts.some((count) => Number(count) < 1)) throw new Error(ERROR.order);
  },
  orderMenus(menus) {},
};

export default Validator;

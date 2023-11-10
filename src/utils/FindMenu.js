import MENUS from "../constant/Menus.js";

function FindMenu(input) {
  return Object.values(MENUS)
    .flat()
    .some((menu) => menu.name === input);
}

export default FindMenu;

import MENU from "../constant/Menu.js";

function FindMenu(input) {
  return Object.values(MENU)
    .flat()
    .some((menu) => menu.name === input);
}

export default FindMenu;

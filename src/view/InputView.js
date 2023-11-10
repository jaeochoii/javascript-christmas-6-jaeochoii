import { Console } from "@woowacourse/mission-utils";
import MESSAGE from "../constant/Message.js";
import Validator from "../utils/Validator.js";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGE.date);
    Validator.inputDate(input);

    return input;
  },

  async readMenus() {
    const input = await Console.readLineAsync(MESSAGE.menu);
    Validator.inputOrder(input);

    return input;
  },
};

export default InputView;

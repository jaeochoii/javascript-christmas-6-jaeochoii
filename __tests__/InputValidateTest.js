import Validator from "../src/utils/Validator.js";

describe("입력값 유효성 검사 테스트", () => {
  test("입력한 날짜가 숫자가 아닌 경우를 확인", () => {
    const dateInput = ["육", "십7", "12.31"];

    dateInput.forEach((date) => {
      expect(() => {
        Validator.inputDate(date);
      }).toThrow();
    });
  });

  test("입력한 날짜가 1부터 31사이의 값이 아닌 경우를 확인", () => {
    const dateInput = ["0", "32", "50"];

    dateInput.forEach((date) => {
      expect(() => {
        Validator.inputDate(date);
      }).toThrow();
    });
  });

  test("입력한 메뉴와 개수가 정해진 형식이 아닌 경우를 확인", () => {
    const inputMenus = [
      "티본스테이크-1,양송이수프_2",
      "티본스테이크1개, 양송이수프 2개",
    ];

    inputMenus.forEach((menu) => {
      expect(() => {
        Validator.inputOrder(menu);
      }).toThrow();
    });
  });

  test("입력한 메뉴와 개수가 메뉴판에 없는 경우를 확인", () => {
    const inputMenus = ["스테이크-1", "티본스테이크-1,사이다-1"];

    inputMenus.forEach((menu) => {
      expect(() => {
        Validator.inputOrder(menu);
      }).toThrow();
    });
  });

  test("입력한 메뉴가 중복된 경우를 확인", () => {
    const inputMenus = [
      "티본스테이크-1,티본스테이크-2",
      "제로콜라-1,양송이수프-1,제로콜라-2",
    ];

    inputMenus.forEach((menu) => {
      expect(() => {
        Validator.inputOrder(menu);
      }).toThrow();
    });
  });

  test("입력한 메뉴의 개수가 1 이상의 숫자가 아닌 경우를 확인", () => {
    const inputMenus = ["티본스테이크-0", "제로콜라-일,양송이수프-둘"];

    inputMenus.forEach((menu) => {
      expect(() => {
        Validator.inputOrder(menu);
      }).toThrow();
    });
  });
});

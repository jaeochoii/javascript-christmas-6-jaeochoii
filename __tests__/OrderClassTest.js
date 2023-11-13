import Order from "../src/domain/Order.js";

describe("Order 클래스 단위 기능 테스트", () => {
  test("입력한 메뉴가 하나의 객체로 분리 되는지 확인", () => {
    const inputOrder = "티본스테이크-1,양송이수프-2,제로콜라-3";
    const answer = {
      티본스테이크: 1,
      양송이수프: 2,
      제로콜라: 3,
    };

    expect(new Order(inputOrder).getOrder()).toEqual(answer);
  });

  test("입력한 메뉴에 음료만 입력되었는지 확인", () => {
    const inputOrder = "제로콜라-3";
    expect(() => {
      new Order(inputOrder);
    }).toThrow("[ERROR]");
  });

  test("입력한 메뉴의 개수가 총합 20이 넘었는지 확인", () => {
    const inputOrder = "티본스테이크-10,양송이수프-10,제로콜라-3";
    expect(() => {
      new Order(inputOrder);
    }).toThrow("[ERROR]");
  });

  test("입력한 메뉴가 메뉴판에 없는 경우를 확인", () => {
    const inputOrder = "안심스테이크-1,초코케이크-2";
    expect(() => {
      new Order(inputOrder);
    }).toThrow("[ERROR]");
  });
});

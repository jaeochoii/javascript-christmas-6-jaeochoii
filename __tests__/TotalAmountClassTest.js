import TotalAmount from "../src/domain/TotalAmount.js";

describe("TotalAmount 클래스 단위 기능 테스트", () => {
  test("입력받은 메뉴의 총 금액을 계산하는 기능 확인", () => {
    const menus = {
      티본스테이크: 1,
      양송이수프: 2,
      제로콜라: 3,
    };
    const answer = 76_000;
    expect(new TotalAmount(menus).getTotalAmount()).toEqual(answer);
  });
});

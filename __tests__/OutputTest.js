import { Console } from "@woowacourse/mission-utils";
import OutputView from "../src/view/OutputView.js";

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();

  return logSpy;
};

describe("출렵값 확인 테스트", () => {
  test("혜택 미리 보기 출력 확인", () => {
    const date = 25;
    const answer = "12월 25일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!";

    const logSpy = getLogSpy();

    OutputView.printPreview(date);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(answer));
  });

  test("입력받은 메뉴와 개수 출력 확인", () => {
    const menus = {
      티본스테이크: 1,
      양송이수프: 2,
      제로콜라: 3,
    };

    const answer =
      "<주문 메뉴>\n티본스테이크 1개\n양송이수프 2개\n제로콜라 3개";

    const logSpy = getLogSpy();

    OutputView.printOrderMenus(menus);

    answer.split("\n").forEach((line, index) => {
      expect(logSpy).toHaveBeenNthCalledWith(index + 1, line);
    });
  });

  test("혜택 받기 이전 총 금액 출력 확인", () => {
    const cost = 13000;
    const answer = "13,000원";

    const logSpy = getLogSpy();

    OutputView.printBeforeDiscount(cost);

    expect(logSpy).toHaveBeenCalledWith(answer);
  });

  test("증정 상품 출력 확인", () => {
    const counts = [2, 0];
    const answers = ["샴페인 2개", "없음"];

    const logSpy = getLogSpy();

    counts.forEach((count) => OutputView.printGiveawayMenus(count));
    answers.forEach((answer) => expect(logSpy).toHaveBeenCalledWith(answer));
  });

  test("혜택 내역 출력 확인", () => {
    const discountList = [1200, 4046, 1000, 25000];
    const answer =
      "<혜택 내역>\n크리스마스 디데이 할인: -1,200원\n평일 할인: -4,046원\n특별 할인: -1,000원\n증정 이벤트: -25,000원";

    const logSpy = getLogSpy();

    OutputView.printBenefitList(discountList);

    answer.split("\n").forEach((line, index) => {
      expect(logSpy).toHaveBeenNthCalledWith(index + 1, line);
    });
  });

  test("혜택 금액 출력 확인", () => {
    const cost = "13000";
    const answer = "-13,000원";

    const logSpy = getLogSpy();

    OutputView.printBenefitAccount(cost);

    expect(logSpy).toHaveBeenCalledWith(answer);
  });

  test("할인 후 예상 결제 금액 출력 확인", () => {
    const cost = "123456";
    const answer = "123,456원";

    const logSpy = getLogSpy();

    OutputView.printAfterDiscount(cost);

    expect(logSpy).toHaveBeenCalledWith(answer);
  });

  test("이벤트 뱃지 출력 확인", () => {
    const costs = [1000, 30000];
    const answers = ["없음", "산타"];

    const logSpy = getLogSpy();

    costs.forEach((cost) => OutputView.printBadge(cost));
    answers.forEach((answer) => expect(logSpy).toHaveBeenCalledWith(answer));
  });
});

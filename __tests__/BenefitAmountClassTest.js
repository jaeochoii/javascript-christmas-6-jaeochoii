import BenefitAmount from "../src/domain/BenefitAmount.js";

describe("BenefitAmount 클래스 단위 기능 테스트", () => {
  test("Event 클래스로부터 얻은 혜택 내역을 기반, 금액으로 환산 되는지 확인(주말)", () => {
    const menus = { 티본스테이크: 2, 초코케이크: 1, 제로콜라: 1 };
    const benefitList = [15, 1, 0, 0, 0];
    const totalAmount = 123000;
    const answer = [2400, 4046, 0, 0, 25000];

    expect(
      new BenefitAmount(menus, benefitList, totalAmount).getBenefitList()
    ).toEqual(answer);
  });

  test("Event 클래스로부터 얻은 혜택 내역을 기반, 금액으로 환산 되는지 확인(평일, 특별할인 X)", () => {
    const menus = { 티본스테이크: 2, 초코케이크: 1, 제로콜라: 1 };
    const benefitList = [13, 0, 1, 0, 0];
    const totalAmount = 123000;
    const answer = [2200, 0, 2023, 0, 25000];

    expect(
      new BenefitAmount(menus, benefitList, totalAmount).getBenefitList()
    ).toEqual(answer);
  });

  test("Event 클래스로부터 얻은 혜택 내역을 기반, 금액으로 환산 되는지 확인(평일, 특별할인 O)", () => {
    const menus = { 티본스테이크: 2, 초코케이크: 1, 제로콜라: 1 };
    const benefitList = [13, 0, 1, 1, 0];
    const totalAmount = 123000;
    const answer = [2200, 0, 2023, 1000, 25000];

    expect(
      new BenefitAmount(menus, benefitList, totalAmount).getBenefitList()
    ).toEqual(answer);
  });

  test("Event 클래스로부터 얻은 혜택 내역을 기반, 금액으로 환산 되는지 확인(12만원 미만 결제)", () => {
    const menus = { 티본스테이크: 2, 초코케이크: 1, 제로콜라: 1 };
    const benefitList = [13, 0, 1, 1, 0];
    const totalAmount = 23000;
    const answer = [2200, 0, 2023, 1000, 0];

    expect(
      new BenefitAmount(menus, benefitList, totalAmount).getBenefitList()
    ).toEqual(answer);
  });

  test("Event 클래스로부터 얻은 혜택 내역을 기반, 금액으로 환산 되는지 확인(날짜 25일 이후) ", () => {
    const menus = { 티본스테이크: 2, 초코케이크: 1, 제로콜라: 1 };
    const benefitList = [27, 0, 1, 1, 0];
    const totalAmount = 123000;
    const answer = [0, 0, 2023, 1000, 25000];

    expect(
      new BenefitAmount(menus, benefitList, totalAmount).getBenefitList()
    ).toEqual(answer);
  });

  test("Event 클래스로부터 얻은 혜택 내역을 기반으로 총 혜택 금액 확인", () => {
    const menus = { 티본스테이크: 2, 초코케이크: 1, 제로콜라: 1 };
    const benefitList = [13, 0, 1, 1, 0];
    const totalAmount = 123000;
    const answer = 30223;

    expect(
      new BenefitAmount(menus, benefitList, totalAmount).getBenefitAmount()
    ).toEqual(answer);
  });
});

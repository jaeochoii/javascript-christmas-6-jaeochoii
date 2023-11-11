import Event from "../src/domain/Event.js";

describe("Event 클래스 단위 기능 테스트", () => {
  test("입력한 날짜가 어떤 혜택에 포함되는 경우인지 배열로 확인", () => {
    const date = ["17", "23", "25"];
    const answer = [
      [17, 0, 1, 1, 0],
      [23, 1, 0, 0, 0],
      [25, 0, 1, 1, 0],
    ];

    date.forEach((day, index) => {
      const list = new Event(day).getEvent();
      expect(list).toEqual(answer[index]);
    });
  });
});

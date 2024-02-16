import { paginate } from "../array";

it.each([5, 10])(
  "should split array into the appropriate amount of pages",
  (size) => {
    const paginated = paginate([...new Array(10)], size);
    expect(paginated.length).toBe(10 / size);
  }
);

it("should return empty array when supplied with no values", () => {
  const paginated = paginate([]);
  expect(paginated).toStrictEqual([[]]);
});

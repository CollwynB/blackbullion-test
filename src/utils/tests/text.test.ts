import { capitaliseFirstLetter } from "../text";

describe("capitaliseFirstLetter", () => {
  it("should capitalise the first letter of a string", () => {
    expect(capitaliseFirstLetter("tony")).toBe("Tony");
    expect(capitaliseFirstLetter("tony")).not.toBe("tony");
  });
});

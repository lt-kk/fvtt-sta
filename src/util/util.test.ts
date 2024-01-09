import { describe, expect, test } from "vitest";
import { constrainNumber } from "./util";


describe("constrainNumber", () => {
  test("in constraint", () => {
    const result = constrainNumber(1, 0, 2);
    expect(result).toBe(1);
  });
  test("< min", () => {
    const result = constrainNumber(-1, 0, 2);
    expect(result).toBe(0);
  });
  test("> max", () => {
    const result = constrainNumber(3, 0, 2);
    expect(result).toBe(2);
  });
});

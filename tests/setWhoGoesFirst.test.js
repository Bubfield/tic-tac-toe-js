import { setWhoGoesFirst } from "../appStateAndFunctions/appFunctions";

test("if mark is X, User goes first, if mark is O, AI goes first", () => {
  expect(setWhoGoesFirst("X")).toBe("User");
  expect(setWhoGoesFirst("O")).toBe("AI");
});

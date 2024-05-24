import { truncateLLCoord, LLtoMGRS, MGRStoLL } from "./utils";

test("truncateLLCoord", () => {
  expect(truncateLLCoord(97.555555555)).toEqual(97.55555);
  expect(truncateLLCoord(97.5)).toEqual(97.5);
  expect(truncateLLCoord(-120.1000000001)).toEqual(-120.1);
  expect(truncateLLCoord(-130.1234567)).toEqual(-130.12345);
});

test("LLtoMGRS", () => {
  expect(
    LLtoMGRS({ latitude: 40.44182111095009, longitude: -80.0127819599416 })
  ).toEqual("17TNE8372377264");
  //   expect(LLtoMGRS({ latitude: 34.80139, longitude: 69.47075 })).toEqual(
  //     "42SWD4305951119"
  //   );
  expect(
    LLtoMGRS({ latitude: 32.35859198791035, longitude: -101.00841428282827 })
  ).toEqual("14SLA1101981957");
});

test("MGRStoLL", () => {
  expect(MGRStoLL("17TNE8372377264")).toEqual({
    latitude: 40.44182111095009,
    longitude: -80.0127819599416,
  });
  //   expect(MGRStoLL("42SWD4305951119")).toEqual({
  //     latitude: 34.80139,
  //     longitude: 69.47073,
  //   });
  expect(MGRStoLL("14SLA1101981957")).toEqual({
    latitude: 32.35859198791035,
    longitude: -101.00841428282827,
  });
});

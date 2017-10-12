import { List, Map } from "immutable";
import * as matchers from "jest-immutable-matchers";
import { setEntries } from "../core";

describe("application logic", () => {
  beforeEach(function() {
    jest.addMatchers(matchers);
  });
  describe("setEntries", () => {
    it("adds the entries to the state", () => {
      const state = Map();
      const entries = List.of("Trainspotting", "28 Days Later");
      const nextState = setEntries(state, entries);
      expect(nextState).toEqualImmutable(
        Map({
          entries: List.of("Trainspotting", "28 Days Later")
        })
      );
    });

    it("converts to immutable", () => {
      const state = Map();
      const entries = ["Trainspotting", "28 Days Later"];
      const nextState = setEntries(state, entries);
      expect(nextState).toEqualImmutable(
        Map({
          entries: List.of("Trainspotting", "28 Days Later")
        })
      );
    });
  });
});

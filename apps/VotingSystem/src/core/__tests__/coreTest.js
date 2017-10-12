import { List, Map } from "immutable";
import * as matchers from "jest-immutable-matchers";
import { setEntries, next, vote } from "../core";

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

  describe("next", () => {
    it("takes the next two entries under vote", () => {
      const state = Map({
        entries: List.of("Trainspotting", "28 Days Later", "Sunshine")
      });
      const nextState = next(state);

      expect(nextState).toEqualImmutable(
        Map({
          vote: Map({
            pair: List.of("Trainspotting", "28 Days Later")
          }),
          entries: List.of("Sunshine")
        })
      );
    });

    it("puts winner of current vote back to entries", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 4,
            "28 Days Later": 2
          })
        }),
        entries: List.of("Sunshine", "Millions", "127 Hours")
      });
      const nextState = next(state);

      expect(nextState).toEqualImmutable(
        Map({
          vote: Map({
            pair: List.of("Sunshine", "Millions")
          }),
          entries: List.of("127 Hours", "Trainspotting")
        })
      );
    });

    it("puts both from tied vote back to entries", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 3,
            "28 Days Later": 3
          })
        }),
        entries: List.of("Sunshine", "Millions", "127 Hours")
      });

      const nextState = next(state);
      expect(nextState).toEqualImmutable(
        Map({
          vote: Map({
            pair: List.of("Sunshine", "Millions")
          }),
          entries: List.of("127 Hours", "Trainspotting", "28 Days Later")
        })
      );
    });

    it("marks winner when just one entry left", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 4,
            "28 Days Later": 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).toEqualImmutable(
        Map({
          winner: "Trainspotting"
        })
      );
    });
  });

  describe("vote", () => {
    it("creates a tally for the voted entry", () => {
      const state = Map({
        pair: List.of("Trainspotting", "28 Days Later")
      });
      const nextState = vote(state, "Trainspotting");
      expect(nextState).toEqualImmutable(
        Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 1
          })
        })
      );
    });

    it("adds to existing tally for the voted entry", () => {
      const state = Map({
        pair: List.of("Trainspotting", "28 Days Later"),
        tally: Map({
          Trainspotting: 3,
          "28 Days Later": 2
        })
      });
      const nextState = vote(state, "Trainspotting");
      expect(nextState).toEqualImmutable(
        Map({
          pair: List.of("Trainspotting", "28 Days Later"),
          tally: Map({
            Trainspotting: 4,
            "28 Days Later": 2
          })
        })
      );
    });
  });
});

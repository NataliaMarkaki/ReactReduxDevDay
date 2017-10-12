import React from "react";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from "react-addons-test-utils";
import ReactDOM from "react-dom";
import { List, Map } from "immutable";
import { Results } from "../Results";

describe("Results", () => {
  it("renders entries with vote counts or zero", () => {
    const pair = List.of("Trainspotting", "28 Days Later");
    const tally = Map({ Trainspotting: 5 });
    const component = renderIntoDocument(<Results pair={pair} tally={tally} />);
    const entries = scryRenderedDOMComponentsWithClass(component, "entry");
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).toBe(2);
    expect(train).toContain("Trainspotting");
    expect(train).toContain("5");
    expect(days).toContain("28 Days Later");
    expect(days).toContain("0");
  });

  it("invokes the next callback when next button is clicked", () => {
    let nextInvoked = false;
    const next = () => (nextInvoked = true);

    const pair = List.of("Trainspotting", "28 Days Later");
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).toBe(true);
  });

  it("renders the winner when there is one", () => {
    const component = renderIntoDocument(
      <Results
        winner="Trainspotting"
        pair={["Trainspotting", "28 Days Later"]}
        tally={Map()}
      />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).toBeTruthy;
    expect(winner.textContent).toContain("Trainspotting");
  });
});

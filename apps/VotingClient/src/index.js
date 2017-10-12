import React from "react";
import ReactDOM from "react-dom";
import { ResultsContainer } from "./Results/Results";
import { VotingContainer } from "../Voting/Voting";
import { Route } from "react-router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../Reducer/Reducer";

const store = createStore(reducer);
store.dispatch({
  type: "SET_STATE",
  state: {
    vote: {
      pair: ["Sunshine", "28 Days Later"],
      tally: { Sunshine: 2 }
    }
  }
});

const routes = (
  <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById("app")
);

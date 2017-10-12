import React from "react";
import ReactDOM from "react-dom";
import Voting from "./Voting/Voting";
import Results from "./Results/Results";
import { Route } from "react-router";
import { createStore } from "redux";
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
    <Route path="/results" component={Results} />
    <Route path="/" component={Voting} />
  </Route>
);

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById("app")
);

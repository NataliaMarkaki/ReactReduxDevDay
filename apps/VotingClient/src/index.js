import React from "react";
import ReactDOM from "react-dom";
import Voting from "./Voting/Voting";
import Results from './Results/Results';
import { Route } from "react-router";

const pair = ["Trainspotting", "28 Days Later"];

const routes = (
  <Route component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={Voting} />
  </Route>
);

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);

import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './Voting/Voting';

const pair = ['Trainspotting', '28 Days Later'];

ReactDOM.render(
  <Voting pair={pair} hasVoted="Trainspotting"/>,
  document.getElementById('app')
);
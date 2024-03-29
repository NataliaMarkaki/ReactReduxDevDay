import React from "react";
import Winner from "../Winner/Winner";
import Vote from "../Vote/Vote";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";

const Voting = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  isDisabled: function() {
    return !!this.props.hasVoted;
  },
  render: function() {
    return (
      <div>
        {this.props.winner ? (
          <Winner ref="winner" winner={this.props.winner} />
        ) : (
          <Vote {...this.props} />
        )}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(["vote", "pair"]),
    winner: state.get("winner")
  };
}

export const VotingContainer = connect(mapStateToProps)(Voting);

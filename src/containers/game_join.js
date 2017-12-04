import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { joinGame } from '../actions';

class GameJoin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.joinGame(this.state.gameId);
    // this.setState({gameId: ''});
  }
  render() {
    return (
      <div>
        <p>Game Join</p>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text" placeholder="game id"
            onChange={event => this.setState({gameId: event.target.value})}
            value={this.state.gameId}/>
          <button type="submit">Join game</button>
        </form>
      </div>
    );
  }
}

GameJoin.propTypes = {
  joinGame: PropTypes.func
};

export default connect(null, {
  joinGame
})(GameJoin);

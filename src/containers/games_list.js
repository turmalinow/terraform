import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  subscribeForGamesList,
  deleteGame
} from '../actions';

class GamesList extends Component {
  componentDidMount() {
    console.debug("GamesList attempt to subscribeForGamesList");
    this.props.subscribeForGamesList(this.props.user);
  }
  render() {
    if (!this.props.user) {
      return (
        <div>Log in to see list of games</div>
      );
    }
    return (
      <div>
        <p>Games List</p>
        {this.props.games.loading ? <p>Loading...</p> : ''}
        <ul>
          {this.props.games.data.map(game => (
            <li key={game._id}>
              {game.title}
              <button onClick={() => this.props.deleteGame(game._id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  componentWillUnmount() {
    console.debug("GamesList componentWillUnmount, it's time to clean subscriptions");
    this.props.games.cancel();
  }
}

GamesList.propTypes = {
  user: PropTypes.object,
  games: PropTypes.object,
  subscribeForGamesList: PropTypes.func,
  deleteGame: PropTypes.func
}

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

export default connect(mapStateToProps, {
  subscribeForGamesList,
  deleteGame
})(GamesList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createGame } from '../actions';

class GameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.createGame({title: this.state.title});
    this.setState({title: ''});
  }
  render() {
    return (
      <div>
        <p>Game Form</p>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text" placeholder="game title"
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}/>
          <button type="submit">Create game</button>
        </form>
      </div>
    );
  }
}

GameForm.propTypes = {
  createGame: PropTypes.func
};

export default connect(null, {
  createGame
})(GameForm);

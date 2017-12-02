import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authorize, signIn, signOut } from '../actions';

import LoginRequired from './login_required';
import GameForm from './game_form';
import GamesList from './games_list';

class App extends Component {
  componentWillMount() {
    this.props.authorize();
  }
  renderAnonym() {
    return (
      <button onClick={() => this.props.signIn()}>Log in</button>
    );
  }
  renderSignedIn() {
    return (
      <button onClick={() => this.props.signOut()}>Log out</button>
    );
  }
  render() {
    return (
      <div>
        <p>
          Welcome {this.props.user ? this.props.user.email : 'anonymous'}!
          {this.props.user ? this.renderSignedIn() : this.renderAnonym()}
        </p>
        <LoginRequired>
          <GameForm />
          <GamesList />
        </LoginRequired>
      </div>
    );
  }
}
App.propTypes = {
  authorize: PropTypes.func,
  signIn: PropTypes.func,
  signOut: PropTypes.func,
  user: PropTypes.object
};

function mapStateToProps({user}) {
  return { user };
}

export default connect(mapStateToProps, {
  authorize,
  signIn,
  signOut
})(App);

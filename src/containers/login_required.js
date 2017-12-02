import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginRequired extends Component {
  render() {
    if (!this.props.user) {
      return null;
    }

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { user: this.props.user }));

    return (
      <div>{ children }</div>
    );
  }
}

LoginRequired.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node
}

function mapStateToProps({user}) {
  return { user };
}

export default connect(mapStateToProps)(LoginRequired);

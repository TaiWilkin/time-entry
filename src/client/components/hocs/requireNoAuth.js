import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class RequireNoAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          return <ChildComponent {...this.props} />;
        case null:
          return <ChildComponent {...this.props} />;
        default:
          return <Redirect to="/entries" />;
      }
    }
  }

  const mapStateToProps = ({ auth }) => {
    return { auth };
  }

  return connect(mapStateToProps)(RequireNoAuth);
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default function requireAuth(Component) {
  class RequireAuthentication extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.checkAuthentication();
    }

    componentWillReceiveProps() {
      this.checkAuthentication();
    }

    checkAuthentication() {
      // if (!this.props.isAuthenticated) {
      //   hashHistory.push('/login');
      // }
    }

    render() {
      return (
        true ?
          <Component {...this.props} /> :
          null
      );
    }
  }

  function mapStateToProps(state) {
    const { isAuthenticated } = state;
    return {
      isAuthenticated,
    };
  }

  return connect(mapStateToProps)(RequireAuthentication);
}

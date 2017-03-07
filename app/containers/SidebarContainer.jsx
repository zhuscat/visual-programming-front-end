import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

class SidebarContainer extends Component {
  render() {
    return (
      <Sidebar {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(SidebarContainer);

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
  const { entities, program } = state;
  const { id, variableArea, procedureArea } = program;
  return {
    entities,
    id,
    variableArea,
    procedureArea,
  };
}

export default connect(mapStateToProps)(SidebarContainer);

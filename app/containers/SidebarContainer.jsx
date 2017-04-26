import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import * as programActions from '../actions/program';

class SidebarContainer extends Component {
  render() {
    return (
      <Sidebar {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { entities, program } = state;
  const { id, variableArea, procedureArea, name, desc } = program;
  return {
    entities,
    id,
    name,
    desc,
    variableArea,
    procedureArea,
  };
}

export default connect(mapStateToProps, {
  onProgramTitleChange: programActions.titleChange,
  onProgramDescChange: programActions.descChange,
  addProgram: programActions.addProgram.request,
  updateProgram: programActions.updateProgram.request,
})(SidebarContainer);

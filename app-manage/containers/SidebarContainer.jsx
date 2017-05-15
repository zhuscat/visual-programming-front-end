import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import * as programActions from '../actions/program';
import * as problemActions from '../actions/problem';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: 不要弄成将所有 props 传进去，将需要的 props 传进去
    return (
      <Sidebar {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { entities, program, user } = state;
  const { id, variableArea, procedureArea, testCaseArea, name, description } = program;
  const { token } = user;
  return {
    entities,
    id,
    name,
    description,
    variableArea,
    procedureArea,
    testCaseArea,
    token,
  };
}

export default connect(mapStateToProps, {
  onProgramTitleChange: programActions.titleChange,
  onProgramDescChange: programActions.descChange,
  addProblem: problemActions.saveProblem.request,
})(SidebarContainer);

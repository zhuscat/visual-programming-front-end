import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProcedureSection from '../components/ProcedureSection';

class ProcedureSectionContainer extends Component {
  render() {
    return (
      <ProcedureSection {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { entities, procedureArea } = state;
  return {
    entities,
    nodes: procedureArea,
  };
}

export default connect(mapStateToProps)(ProcedureSectionContainer);

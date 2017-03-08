import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VariableSection from '../components/VariableSection';

class VariableSectionContainer extends Component {
  render() {
    return (
      <VariableSection {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { entities, variableArea } = state;
  return {
    entities,
    nodes: variableArea,
  };
}

export default connect(mapStateToProps)(VariableSectionContainer);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TestCaseSection from '../components/TestCaseSection';
import * as testcaseActions from '../actions/testcase';

const propTypes = {
  addTestCase: PropTypes.func,
  changeTestCase: PropTypes.func,
  deleteTestCase: PropTypes.func,
};

class TestCaseSectionContainer extends Component {
  constructor(props) {
    super(props);
    this.handleTestCaseAdd = this.handleTestCaseAdd.bind(this);
    this.handleTestCaseChange = this.handleTestCaseChange.bind(this);
    this.handleTestCaseDelete = this.handleTestCaseDelete.bind(this);
  }

  handleTestCaseAdd({inputs, expect}) {
    this.props.addTestCase({
      area: 'TESTCASE_AREA',
      inputs,
      expect,
    });
  }

  handleTestCaseChange({ id, inputs, expect }) {
    this.props.changeTestCase({
      id,
      inputs,
      expect,
    });
  }

  handleTestCaseDelete({ id }) {
    this.props.deleteTestCase({ id });
  }

  render() {
    return (
      <TestCaseSection
        entities={this.props.entities}
        testCaseArea={this.props.testCaseArea}
        variableArea={this.props.variableArea}
        onTestCaseAdd={this.handleTestCaseAdd}
        onTestCaseChange={this.handleTestCaseChange}
        onTestCaseDelete={this.handleTestCaseDelete}
      />
    );
  }
}

TestCaseSectionContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { entities, program } = state;
  return {
    entities,
    testCaseArea: program.testCaseArea,
    variableArea: program.variableArea,
  };
}

export default connect(mapStateToProps, {
  addTestCase: testcaseActions.addTestCase,
  changeTestCase: testcaseActions.changeTestCase,
  deleteTestCase: testcaseActions.deleteModule,
})(TestCaseSectionContainer);

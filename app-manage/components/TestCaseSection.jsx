import React, { Component, PropTypes } from 'react';
import AddModuleButton from './AddModuleButton';
import TestCaseModule from './testcase-module';
import '../../styles/notification-bar.scss';

const propTypes = {
  variableArea: PropTypes.array,
  entities: PropTypes.object,
  testCaseArea: PropTypes.array,
  onTestCaseAdd: PropTypes.func,
  onTestCaseChange: PropTypes.func,
  onTestCaseDelete: PropTypes.func,
};

const defaultProps = {
  variableArea: [],
  entities: {},
  testCaseArea: [],
};

export default class TestCaseSection extends Component {
  constructor(props) {
    super(props);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleAddButtonClick() {
    const inputs = {};
    const { variableArea, entities } = this.props;
    console.log(variableArea);
    variableArea
      .forEach((id) => {
        const input = entities[id];
        const { name, moduleType } = input;
        if (name && moduleType === 'INPUT') {
          inputs[name] = null;
        }
      });
    this.props.onTestCaseAdd({
      inputs,
      expect: null,
    });
  }

  renderAddButton() {
    return (
      <div>
        <AddModuleButton
          style={{
            color: '#fff',
            backgroundColor: 'gray',
          }}
          onClick={this.handleAddButtonClick}
        />
      </div>
    );
  }

  renderTestCases() {
    const { testCaseArea } = this.props;
    const items = testCaseArea.map((tc) => {
      return (
        <TestCaseModule
          testCase={this.props.entities[tc]}
          onTestCaseChange={this.props.onTestCaseChange}
          onTestCaseDelete={this.props.onTestCaseDelete}
        />
      );
    });
    return items;
  }

  render() {
    return (
      <div
        className="vp-section"
      >
        <div className="vp-notification-bar">
          <i className="iconfont icon-laba" />温馨提示：不要急，测试用例可以不断添加
        </div>
        {this.renderTestCases()}
        {this.renderAddButton()}
      </div>
    );
  }
}

TestCaseSection.propTypes = propTypes;
TestCaseSection.defaultProps = defaultProps;

import React, { Component, PropTypes } from 'react';
import ChooseInput from './ChooseInput';
import TextInput from './TextInput';
import noop from '../utils/noop';

// note of implementation
// 当创建一个 testcase 模块的时候，外部会传入一个 testCase 对象
// 比如输入为 a,b 
// 则传入

/*
{
  inputs: {
    a: null,
    b: null,
  },
  expect: null,
}
*/

const propTypes = {
  testCase: PropTypes.object,
  onTestCaseChange: PropTypes.func,
  onTestCaseDelete: PropTypes.func,
};

const defaultProps = {
  testCase: {
    inputs: {},
    expect: '',
  },
};

export default class TestCaseModule extends Component {
  constructor(props) {
    super(props);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExpectChange = this.handleExpectChange.bind(this);
  }

  handleCloseButtonClick() {
    this.props.onTestCaseDelete({
      id: this.props.testCase.id,
    });
  }

  // TODO: 可能会造成性能问题，先实现基本功能
  handleInputChange(key) {
    return (value) => {
      this.props.onTestCaseChange({
        id: this.props.testCase.id,
        inputs: {
          ...this.props.testCase.inputs,
          [key]: value,
        },
        expect: this.props.testCase.expect,
      });
    }
  }

  handleExpectChange(value) {
    this.props.onTestCaseChange({
      ...this.props.testCase,
      expect: value,
    });
  }

  renderInputs() {
    const { testCase } = this.props;
    const { inputs } = testCase;
    const keys = Object.keys(inputs);
    const items = keys.map(key => (
      <div className="vp-input-module__item">
        <label className="vp-input-module__name">{key}</label>
        <TextInput
          value={inputs[key] === null ? '' : inputs[key]}
          onChange={this.handleInputChange(key)}
        />
      </div>
    ));
    return items;
  }

  render() {
    return (
      <div className="vp-input-module">
        <div className="vp-input-module__title">
          <span>测试用例</span>
          <i
            className="fa fa-times vp-module__close"
            onClick={this.handleCloseButtonClick}
          />
        </div>
        <div className="vp-input-module__body">
          {this.renderInputs()}
          <div className="vp-input-module__item">
            <label className="vp-input-module__name">输出</label>
            <TextInput
              value={this.props.testCase.expect}
              onChange={this.handleExpectChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

TestCaseModule.propTypes = propTypes;
TestCaseModule.defaultProps = defaultProps;

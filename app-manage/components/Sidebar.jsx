import React, { Component, PropTypes } from 'react';
import UnderlineInput from './UnderlineInput';
import UnderlineTextarea from './underline-textarea';
import Button from './Button';
import denormalize from '../utils/denormalize';
import '../../styles/sidebar.scss';

const propTypes = {
  id: PropTypes.string,
  entities: PropTypes.object,
  procedureArea: PropTypes.array,
  variableArea: PropTypes.array,
  testCaseArea: PropTypes.array,
  onProgramTitleChange: PropTypes.func,
  onProgramDescChange: PropTypes.func,
  addProblem: PropTypes.func,
  updateProblem: PropTypes.func,
  name: PropTypes.string,
  description: PropTypes.string,
  state: PropTypes.number,
};

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
    this.handleProgramTitleChange = this.handleProgramTitleChange.bind(this);
    this.handleProgramDescChange = this.handleProgramDescChange.bind(this);
  }

  // 这里这个方法就当成发布了，严格来说只改变 state 吧
  onUpdateButtonClick() {
    // 更新需要 name description state testCases
    const { id, name, description, entities, procedureArea, variableArea, testCaseArea } = this.props;
    const structInfo = JSON.stringify(denormalize({ entities, procedureArea, variableArea }));
    const testCases = [];
    testCaseArea.forEach((id) => {
      const tc = entities[id];
      if (tc) {
        testCases.push({
          inputs: tc.inputs,
          expect: tc.expect,
        });
      }
    });
    this.props.updateProblem({
      program: {
        id: id,
        name,
        description,
        state: 1,
        testCases,
      },
    });
  }

  onSaveButtonClick() {
    const { name, description, entities, procedureArea, variableArea, testCaseArea } = this.props;

    const denormalizedData = denormalize({ entities, procedureArea, variableArea });
    const inputs = [];
    let output = {};
    denormalizedData.variableArea.forEach((variable) => {
      if (variable.moduleType === 'INPUT') {
        inputs.push({
          name: variable.name,
          dtype: variable.dtype,
          desc: variable.desc,
        });
      } else if (variable.moduleType === 'OUTPUT') {
        output = {
          name: variable.name,
          dtype: variable.dtype,
          desc: variable.desc,
        };
      }
    });
    const testCases = [];
    testCaseArea.forEach((id) => {
      const tc = entities[id];
      if (tc) {
        testCases.push({
          inputs: tc.inputs,
          expect: tc.expect,
        });
      }
    });
    const structInfo = JSON.stringify(denormalize({ entities, procedureArea, variableArea }));
    const program = {
      name,
      description,
      inputs,
      output,
      testCases,
      structInfo,
    };
    this.props.addProblem({ program });
  }

  handleProgramTitleChange(event) {
    this.props.onProgramTitleChange(event.target.value);
  }

  handleProgramDescChange(event) {
    this.props.onProgramDescChange(event.target.value);
  }

  renderButtons() {
    const { id } = this.props;
    if (!id) {
      return (
        <Button
          type="hollow"
          radius
          style={{
            width: '100%',
            display: 'block',
            margin: '16px auto',
          }}
          onClick={this.onSaveButtonClick}
        >
          保存
        </Button>
      );
    } else {
      const { state } = this.props;
      if (state === 0) {
        // 未发布状态
        return (
          <Button
            type="hollow"
            radius
            style={{
              width: '100%',
              display: 'block',
              margin: '16px auto',
            }}
            onClick={this.onUpdateButtonClick}
          >
            发布
          </Button>
        );
      } else {
        return (
          <Button
            type="hollow"
            radius
            style={{
              width: '100%',
              display: 'block',
              margin: '16px auto',
            }}
            onClick={this.onUpdateButtonClick}
          >
            更新
          </Button>
        );
      }
    }
  }

  render() {
    return (
      <div className="vp-sidebar">
        <div className="vp-sidebar__title">信息</div>
        <UnderlineInput
          placeholder="编辑标题"
          value={this.props.name}
          onChange={this.handleProgramTitleChange}
        />
        <UnderlineTextarea
          placeholder="编辑描述"
          value={this.props.description}
          onChange={this.handleProgramDescChange}
        />
        <div className={`vp-problem-state vp-problem-state--${this.props.state === 0 ? 'gray' : 'green'}`}>
        {this.props.state === 0 ? "未发布" : "已发布"}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

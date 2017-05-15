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
  name: PropTypes.string,
  description: PropTypes.string,
  onExecButtonClick: PropTypes.func,
};

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onExecButtonClick = this.onExecButtonClick.bind(this);
    this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
    this.handleProgramTitleChange = this.handleProgramTitleChange.bind(this);
    this.handleProgramDescChange = this.handleProgramDescChange.bind(this);
  }

  // 这里这个方法就当成发布了，严格来说只改变 state 吧
  onUpdateButtonClick() {
    const { id, name, description, entities, procedureArea, variableArea } = this.props;
    const structInfo = JSON.stringify(denormalize({ entities, procedureArea, variableArea }));
    this.props.updateProgram({
      program: {
        id: id,
        state: 1,
      },
    });
  }

  onSaveButtonClick() {
    const { name, description, entities, procedureArea, variableArea, testCaseArea } = this.props;
    /**
     * 当调用两次 denormalize 的时候出现错误
     * 其原因应该是这个函数是有副作用的，改变的原来的对象
     * TODO: 将其改为无副作用的
     * DONE: 改完了
     */
    // console.log(JSON.stringify(denormalize({ entities, procedureArea, variableArea }), null, '--'));

    // 已经实现了后端要求的格式了
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

  onExecButtonClick() {
    // this.props.onExecButtonClick(this.props.id);
    if (window) {
      window.open(`http://localhost:8080/v1/program/gen/${this.props.id}`);
    }
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
      }
    }
    return null;
  }

  // 暂时先弄成没有保存的时候就不显示执行按钮
  // 不过这样的问题是当“程序更新”了之后没有按更新按钮，执行的仍然是旧程序
  // TODO: need to be imporved
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
        {this.renderButtons()}
        {this.props.id ?
          <Button
            type="hollow"
            radius
            style={{
              width: '100%',
              display: 'block',
              margin: '8px auto',
            }}
            onClick={this.onExecButtonClick}
          >
            执行
          </Button> : null
        }
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

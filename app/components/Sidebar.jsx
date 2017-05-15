import React, { Component, PropTypes } from 'react';
import UnderlineInput from './UnderlineInput';
import Button from './Button';
import denormalize from '../utils/denormalize';
import '../../styles/sidebar.scss';

const propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  state: PropTypes.any, /* can be number or null */
  entities: PropTypes.object,
  procedureArea: PropTypes.array,
  variableArea: PropTypes.array,
  onProgramTitleChange: PropTypes.func,
  onProgramDescChange: PropTypes.func,
  addProgram: PropTypes.func,
  updateProgram: PropTypes.func,
  name: PropTypes.string,
  description: PropTypes.string,
  onExecButtonClick: PropTypes.func,
  updateProblem: PropTypes.func,
  execProblem: PropTypes.func,
  rate: PropTypes.any,
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

  onUpdateButtonClick() {
    const { id, name, description, entities, procedureArea, variableArea, type } = this.props;
    const structInfo = JSON.stringify(denormalize({ entities, procedureArea, variableArea }));
    if (type === 'PROGRAM') {
      this.props.updateProgram({
        program: {
          programId: id,
          name,
          description,
          structInfo,
        },
      });
    } else if (type === 'PROBLEM') {
      this.props.updateProblem({
        program: {
          id,
          structInfo,
        },
      });
    }
  }

  onSaveButtonClick() {
    const { name, description, entities, procedureArea, variableArea, type } = this.props;
    /**
     * 当调用两次 denormalize 的时候出现错误
     * 其原因应该是这个函数是有副作用的，改变的原来的对象
     * TODO: 将其改为无副作用的
     * DONE: 改完了
     */
    // console.log(JSON.stringify(denormalize({ entities, procedureArea, variableArea }), null, '--'));
    const structInfo = JSON.stringify(denormalize({ entities, procedureArea, variableArea }));
    if (type === 'PROGRAM') {
      this.props.addProgram({
        program: {
          name,
          description,
          structInfo,
        },
      });
    } else if (type === 'PROBLEM') {
      this.props.updateProblem({
        program: {
          id: this.props.id,
          structInfo,
        },
      });
    }
  }

  onExecButtonClick() {
    // this.props.onExecButtonClick(this.props.id);
    if (window) {
      const { type, id } = this.props;
      if (type === 'PROGRAM') {
        window.open(`http://localhost:8080/v1/program/gen/${id}`);
      } else if (type === 'PROBLEM') {
        this.props.execProblem({ id });
      }
    }
  }

  handleProgramTitleChange(event) {
    this.props.onProgramTitleChange(event.target.value);
  }

  handleProgramDescChange(event) {
    this.props.onProgramDescChange(event.target.value);
  }

  renderSaveOrUpdateButton() {
    const shouldRenderUpdate = 
      (this.props.id && this.props.type === 'PROGRAM') ||
      (this.props.id && this.props.type === 'PROBLEM' && this.props.state !== 0);
    return (
      <Button
        type="hollow"
        radius
        style={{
          width: '100%',
          display: 'block',
          margin: '16px auto',
        }}
        onClick={this.props.id ? this.onUpdateButtonClick : this.onSaveButtonClick}
      >
        {shouldRenderUpdate ? '更新' : '保存'}
      </Button>
    );
  }

  renderExecButton() {
    const { id, type } = this.props;
    if ((id && type === 'PROGRAM') || (id && type === 'PROBLEM' && this.props.state !== 0)) {
      return (
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
        </Button>
      );
    }
    return null;
  }

  renderStatus() {
    const { type, state } = this.props;
    if (type === 'PROGRAM') {
      return null;
    } else if (type === 'PROBLEM') {
      if (state === 0) {
        return <div className="vp-problem-state">未做题</div>;
      } else if (state === 1) {
        return <div className="vp-problem-state vp-problem-state--yellow">进行中</div>;
      } else if (state === 2) {
        return <div className="vp-problem-state vp-problem-state--green">已通过</div>;
      } else if (state === 3) {
        return <div className="vp-problem-state vp-problem-state--red">未通过</div>;
      }
    }
    return null;
  }

  renderRate() {
    const { type, rate } = this.props;
    if (type === 'PROGRAM') {
      return null;
    } else if (type === 'PROBLEM') {
      return <div className="vp-problem-rate">{`${rate}%`}</div>;
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
        <UnderlineInput
          placeholder="编辑描述"
          value={this.props.description}
          onChange={this.handleProgramDescChange}
        />
        {this.renderStatus()}
        {this.renderRate()}
        {this.renderSaveOrUpdateButton()}
        {this.renderExecButton()}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

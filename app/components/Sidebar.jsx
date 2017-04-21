import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import UnderlineInput from './UnderlineInput';
import Button from './Button';
import denormalize from '../utils/denormalize';
import '../../styles/sidebar.scss';

const propTypes = {
  id: PropTypes.string,
  entities: PropTypes.object,
  procedureArea: PropTypes.array,
  variableArea: PropTypes.array,
};

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onExecButtonClick = this.onExecButtonClick.bind(this);
  }

  onSaveButtonClick() {
    const { entities, procedureArea, variableArea } = this.props;
    console.log(variableArea);
    // console.log(JSON.stringify(denormalize({ entities, procedureArea, variableArea }), null, '--'));
    console.log(JSON.stringify(denormalize({ entities, procedureArea, variableArea })));
  }

  onExecButtonClick() {
    if (window) {
      window.open(`/v1/program/gen/${this.props.id}`);
    }
  }

  // 暂时先弄成没有保存的时候就不显示执行按钮
  // 不过这样的问题是当“程序更新”了之后没有按更新按钮，执行的仍然是旧程序
  // TODO: need to be imporved
  render() {
    return (
      <div className="vp-sidebar">
        <div className="vp-sidebar__title">信息</div>
        <UnderlineInput placeholder="编辑标题" />
        <UnderlineInput placeholder="编辑描述" />
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
          {this.props.id ? '更新' : '保存'}
        </Button>
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

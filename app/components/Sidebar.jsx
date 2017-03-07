import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import UnderlineInput from './UnderlineInput';
import Button from './Button';
import denormalize from '../utils/denormalize';
import '../../styles/sidebar.scss';

const propTypes = {
  dispatch: PropTypes.func,
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
    console.log(JSON.stringify(denormalize({ entities, procedureArea, variableArea }), null, '--'));
  }

  onExecButtonClick() {

  }

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
        >
          保存
        </Button>
        <Button
          type="hollow"
          radius
          style={{
            width: '100%',
            display: 'block',
            margin: '8px auto',
          }}
          onClick={this.onSaveButtonClick}
        >
          执行
        </Button>
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

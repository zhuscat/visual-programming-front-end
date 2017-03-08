import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ChooseInput from './ChooseInput';
import IconButton from './IconButton';
import noop from '../utils/noop';
import '../../styles/operator-module.scss';
import { changeUnaryOperator, deleteUnaryOperator } from '../actions/UnaryOperatorActions';

const propTypes = {
  id: PropTypes.string,
  val: PropTypes.string,
  valType: PropTypes.string,
  op: PropTypes.string,
  assignValue: PropTypes.string,
  entities: PropTypes.object,
  parentId: PropTypes.string,
  dispatch: PropTypes.func,
};

const defaultProps = {
  val: '',
  op: '',
  parentId: '',
};

const opTypes = [
  {
    text: '＋',
    value: 'plus',
  },
  {
    text: '－',
    value: 'minus',
  },
];

export default class UnaryOperatorModule extends Component {
  constructor(props) {
    super(props);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.handleFisrtOperandSelect = this.handleFisrtOperandSelect.bind(this);
    this.chooseOperatorButtonClick = this.chooseOperatorButtonClick.bind(this);
    this.handleAssignInputClick = this.handleAssignInputClick.bind(this);
    this.handleFirstWithInputChange = this.handleFirstWithInputChange.bind(this);
  }

  onDeleteButtonClick() {
    const { dispatch, id } = this.props;
    dispatch(deleteUnaryOperator({ id }));
  }

  getChooseOptions() {
    const { entities } = this.props;
    const options = [];
    Object.keys(entities).forEach(function(key) {
      if (entities[key].moduleType === 'VARIABLE' || entities[key].moduleType === 'INPUT') {
        options.push({
          text: entities[key].name ? entities[key].name : '',
          value: key,
        });
      }
    });
    return options;
  }

  getAssignOptions() {
    const { entities } = this.props;
    const options = [];
    Object.keys(entities).forEach(function(key) {
      if (entities[key].moduleType === 'VARIABLE' || entities[key].moduleType === 'OUTPUT' || entities[key].moduleType === 'INPUT') {
        options.push({
          text: entities[key].name ? entities[key].name : '',
          value: key,
        });
      }
    });
    return options;
  }

  handleFisrtOperandSelect(value) {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      val: value,
      valType: 'VAR',
      op: this.props.op,
      assignValue: this.props.assignValue,
    }));
  }

  handleAssignInputClick(value) {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      val: this.props.val,
      valType: this.props.valType,
      op: this.props.op,
      assignValue: value,
    }));
  }

  handleFirstWithInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      val: value,
      valType: 'immediate',
      op: this.props.op,
      assignValue: this.props.assignValue,
    }));
  }

  chooseOperatorButtonClick() {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      val: this.props.val,
      valType: this.props.valType,
      op: this.getNextOpratorValue(),
      assignValue: this.props.assignValue,
    }));
  }

  getOpratorText() {
    for (let i = 0; i < opTypes.length; i++) {
      if (opTypes[i].value === this.props.op) {
        return opTypes[i].text;
      }
    }
    return '';
  }

  getNextOpratorValue() {
    for (let i = 0; i < opTypes.length; i++) {
      if (opTypes[i].value === this.props.op) {
        if (i + 1 === opTypes.length) {
          return opTypes[0].value;
        }
        return opTypes[i + 1].value;
      }
    }
    return '';
  }

  render() {
    const firstInputValue = this.props.valType === 'immediate' ? this.props.val : '';
    return (
      <div className="vp-operator-module">
        <div className="vp-operator-module__title">
          <span
            style={{
              marginRight: '16px',
            }}
          >
            一元操作
          </span>
          <ChooseInput
            value={this.props.assignValue}
            onOptionSelect={this.handleAssignInputClick}
            options={this.getAssignOptions()}
          />
          <i
            className="fa fa-times vp-module__close"
            onClick={this.onDeleteButtonClick}
          />
        </div>
        <div className="vp-operator-module__body">
          <div className="vp-operator-module__item">
            <IconButton
              text={this.getOpratorText()}
              style={{
                color: '#2197d7',
              }}
              onClick={this.chooseOperatorButtonClick}
            />
          </div>
          <div className="vp-operator-module__item">
            <ChooseInput
              value={this.props.val}
              onOptionSelect={this.handleFisrtOperandSelect}
              options={this.getChooseOptions()}
              handleWithInputValueChange={this.handleFirstWithInputChange}
              inputValue={firstInputValue}
              showInputValue={this.props.valType === 'immediate'}
              withInput
            />
          </div>
        </div>
      </div>
    );
  }
}

UnaryOperatorModule.propTypes = propTypes;
UnaryOperatorModule.defaultProps = defaultProps;

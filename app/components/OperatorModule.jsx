import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ChooseInput from './ChooseInput';
import IconButton from './IconButton';
import noop from '../utils/noop';
import '../../styles/operator-module.scss';
import { changeOperator, deleteOperator } from '../actions/OperatorActions';

const propTypes = {
  id: PropTypes.string,
  first: PropTypes.string,
  firstType: PropTypes.string,
  second: PropTypes.string,
  secondType: PropTypes.string,
  op: PropTypes.string,
  assignValue: PropTypes.string,
  entities: PropTypes.object,
  parentId: PropTypes.string,
  dispatch: PropTypes.func,
};

const defaultProps = {
  first: '',
  second: '',
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
  {
    text: '×',
    value: 'multiply',
  },
  {
    text: '÷',
    value: 'divide',
  },
  {
    text: '<',
    value: 'less',
  },
  {
    text: '<=',
    value: 'le',
  },
  {
    text: '>',
    value: 'greater',
  },
  {
    text: '>=',
    value: 'ge',
  },
  {
    text: '==',
    value: 'equal',
  },
  {
    text: '%',
    value: 'mod',
  },
];

export default class OperatorModule extends Component {
  constructor(props) {
    super(props);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.handleFisrtOperandSelect = this.handleFisrtOperandSelect.bind(this);
    this.handleSecondOperandSelect = this.handleSecondOperandSelect.bind(this);
    this.chooseOperatorButtonClick = this.chooseOperatorButtonClick.bind(this);
    this.handleAssignInputClick = this.handleAssignInputClick.bind(this);
    this.handleFirstWithInputChange = this.handleFirstWithInputChange.bind(this);
    this.handleSecondWithInputChange = this.handleSecondWithInputChange.bind(this);
  }

  onDeleteButtonClick() {
    const { dispatch, id } = this.props;
    dispatch(deleteOperator({ id }));
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
    dispatch(changeOperator({
      id: this.props.id,
      first: value,
      firstType: 'VAR',
      second: this.props.second,
      secondType: this.props.secondType,
      op: this.props.op,
      assignValue: this.props.assignValue,
    }));
  }

  handleSecondOperandSelect(value) {
    const { dispatch } = this.props;
    dispatch(changeOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      second: value,
      secondType: 'VAR',
      op: this.props.op,
      assignValue: this.props.assignValue,
    }));
  }

  handleAssignInputClick(value) {
    const { dispatch } = this.props;
    dispatch(changeOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      second: this.props.second,
      secondType: this.props.secondType,
      op: this.props.op,
      assignValue: value,
    }));
  }

  handleFirstWithInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeOperator({
      id: this.props.id,
      first: value,
      firstType: 'immediate',
      second: this.props.second,
      secondType: this.props.secondType,
      op: this.props.op,
      assignValue: this.props.assignValue,
    }));
  }

  handleSecondWithInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      second: value,
      secondType: 'immediate',
      op: this.props.op,
      assignValue: this.props.assignValue,
    }));
  }

  chooseOperatorButtonClick() {
    const { dispatch } = this.props;
    dispatch(changeOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      second: this.props.second,
      secondType: this.props.secondType,
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
    const firstInputValue = this.props.firstType === 'immediate' ? this.props.first : '';
    const secondInputValue = this.props.secondType === 'immediate' ? this.props.second : '';
    return (
      <div className="vp-operator-module">
        <div className="vp-operator-module__title">
          <span
            style={{
              marginRight: '16px',
            }}
          >
            操作
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
            <ChooseInput
              value={this.props.first}
              onOptionSelect={this.handleFisrtOperandSelect}
              options={this.getChooseOptions()}
              handleWithInputValueChange={this.handleFirstWithInputChange}
              inputValue={firstInputValue}
              showInputValue={this.props.firstType === 'immediate'}
              withInput
            />
          </div>
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
              value={this.props.second}
              onOptionSelect={this.handleSecondOperandSelect}
              options={this.getChooseOptions()}
              handleWithInputValueChange={this.handleSecondWithInputChange}
              inputValue={secondInputValue}
              showInputValue={this.props.secondType === 'immediate'}
              withInput
            />
          </div>
        </div>
      </div>
    );
  }
}

OperatorModule.propTypes = propTypes;
OperatorModule.defaultProps = defaultProps;

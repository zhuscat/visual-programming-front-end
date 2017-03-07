import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import '../../styles/underline-input.scss';

const propTypes = {
  placeholder: PropTypes.string,
};

export default class UnderlineInput extends Component {
  render() {
    return (
      <input type="text" className="vp-underline-input" placeholder={this.props.placeholder} />
    )
  }
}

UnderlineInput.propTypes = propTypes;

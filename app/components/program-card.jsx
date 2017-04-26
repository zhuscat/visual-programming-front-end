import React, { Component, PropTypes } from 'react';
import '../../styles/program-card.scss';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default class ProgramCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // do somethoing
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div
        className="program-card"
        onClick={this.handleClick}
      >
        <div className="program-card__title">
          {this.props.title}
        </div>
        <div className="program-card__description">
         {this.props.description}
        </div>
      </div>
    );
  }
}

ProgramCard.propTypes = propTypes;

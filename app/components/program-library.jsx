import React, { Component, PropTypes } from 'react';
import ProgramCard from './program-card';
import '../../styles/program-library.scss';

const propTypes = {
  items: PropTypes.array,
  onCardClick: PropTypes.func,
};

export default class ProgramLibrary extends Component {

  render() {
    return (
      <div>
        {this.props.items.map(item => {
          return (
            <ProgramCard
              title={item.name}
              description="缺省的描述，服务端未提供"
              onClick={this.props.onCardClick}
            />
          );
        })}
      </div>
    );
  }
}

ProgramLibrary.propTypes = propTypes;

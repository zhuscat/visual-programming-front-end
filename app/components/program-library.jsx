import React, { Component, PropTypes } from 'react';
import ProgramCard from './program-card';
import Button from './Button';
import '../../styles/program-library.scss';

const propTypes = {
  items: PropTypes.array,
  onCardClick: PropTypes.func,
  onCreateClick: PropTypes.func,
};

export default class ProgramLibrary extends Component {

  render() {
    return (
      <div
        style={{
          width: 1024,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          <Button
            type="primary"
            onClick={this.props.onCreateClick}
          >
            创建
          </Button>
        </div>
        <div>
          {this.props.items.map(item => {
            return (
              <ProgramCard
                id={item.programId}
                title={item.name}
                description="缺省的描述，服务端未提供"
                onClick={this.props.onCardClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ProgramLibrary.propTypes = propTypes;

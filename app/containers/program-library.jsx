import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spin from '../components/spin';
import LoadingOverlay from '../components/loading-overlay';
import ProgramLibrary from '../components/program-library';
import { history } from '../services';
import * as programActions from '../actions/program';

const propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  fetchProgram: PropTypes.func,
};

class ProgramLibraryContainer extends Component {
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(id) {
    this.props.fetchProgram(id);
    history.push('/');
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <LoadingOverlay isShowing={this.props.isLoading} />
        <ProgramLibrary
          items={this.props.items}
          onCardClick={this.handleCardClick}
        />
      </div>
    );
  }
}

ProgramLibraryContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { programList } = state;
  const { isLoading, items } = programList;
  return {
    isLoading,
    items,
  };
}

export default connect(mapStateToProps, {
  fetchProgram: programActions.fetchProgram.request,
})(ProgramLibraryContainer);



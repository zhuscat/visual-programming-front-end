import React, { Component, PropTypes } from 'react';
import SidebarContainer from './SidebarContainer';
import VariableSectionContainer from './VariableSectionContainer';
import ProcedureSectionContainer from './ProcedureSectionContainer'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <SidebarContainer />
        <div className="vp-container">
          <VariableSectionContainer />
          <ProcedureSectionContainer />
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import SidebarContainer from './SidebarContainer';
import VariableSectionContainer from './VariableSectionContainer';
import ProcedureSectionContainer from './ProcedureSectionContainer';
import '../../styles/header-nav.scss';
import '../../styles/header.scss';
import '../../styles/utils.scss';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
  }
  render() {
    return (
      <div>
        <SidebarContainer />
        <div className="vp-container">
          <VariableSectionContainer />
          <ProcedureSectionContainer />
        </div>
      </div>
    );
  }
}

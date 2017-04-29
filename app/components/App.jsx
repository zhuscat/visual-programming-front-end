import React, { Component, PropTypes } from 'react';
import InputModule from './InputModule';
import ConditionModule from './ConditionModule';
import OperatorModule from './OperatorModule';
import VariableModule from './VariableModule';
import OutputModule from './OutputModule';
import Sidebar from './Sidebar';
import VariableSection from './VariableSection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Sidebar />
        <div className="vp-container">
          <VariableSection
            data={
              [
                {
                  id: '123456',
                  moduleType: 'input',
                  name: 'haha',
                  dtype: 'xixi',
                  desc: 'keke',
                },
                {
                  moduleType: 'output',
                },
                {
                  moduleType: 'variable',
                },
                {
                  id: '123457',
                  moduleType: 'input',
                  name: 'haha',
                  dtype: 'xixi',
                  desc: 'keke',
                },
              ]
            }
          />
          <div className="vp-section">
            <InputModule />
            <ConditionModule />
            <OperatorModule />
            <VariableModule />
            <OutputModule />
          </div>
        </div>
      </div>
    );
  }
}

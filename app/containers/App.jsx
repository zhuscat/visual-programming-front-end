import React, { Component, PropTypes } from 'react';
import SidebarContainer from './SidebarContainer';
import VariableSectionContainer from './VariableSectionContainer';
import ProcedureSectionContainer from './ProcedureSectionContainer';
import '../../styles/header-nav.scss';
import '../../styles/header.scss';
import '../../styles/utils.scss';

const propTypes = {
  children: PropTypes.any,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <header className="vp-header clearfix">
          <h1 className="vp-header-brand">暂时</h1>
          <nav className="vp-header-nav">
            <div className="vp-header-nav__item">编程</div>
            <div className="vp-header-nav__item">登录</div>
            <div className="vp-header-nav__item">注册</div>
          </nav>
        </header>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

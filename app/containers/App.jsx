import React, { Component, PropTypes } from 'react';
import SidebarContainer from './SidebarContainer';
import VariableSectionContainer from './VariableSectionContainer';
import ProcedureSectionContainer from './ProcedureSectionContainer';
import { Link } from 'react-router';
import NavItem from '../components/NavItem';
import '../font/iconfont.css';
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
            <NavItem
              link="/"
              iconName="dianping"
              title="编程"
            />
            <NavItem
              link="/login"
              iconName="denglu"
              title="登录"
            />
            <NavItem
              link="/signup"
              iconName="geren"
              title="注册"
            />
          </nav>
        </header>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

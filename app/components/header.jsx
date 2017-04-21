import React, { Component, PropTypes } from 'react';
import NavItem from './NavItem';

const propTypes = {
  user: PropTypes.object,
  onSignoutClick: PropTypes.func,
};

export default class Header extends Component {
  renderNotLogin() {
    return (
      <nav className="vp-header-nav">
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
    );
  }
  renderLogin() {
    return (
      <nav className="vp-header-nav">
        <NavItem
          link="/"
          iconName="dianping"
          title="编程"
        />
        <NavItem
          link="/login"
          iconName="jihe"
          title="集合"
        />
        <NavItem
          link="/user"
          iconName="geren"
          title="信息"
        />
        <NavItem
          onButtonClick={this.props.onSignoutClick}
          iconName="logout"
          title="退出"
        />
      </nav>
    );
  }
  render() {
    return (
      <header className="vp-header clearfix">
        <h1 className="vp-header-brand">可视化编程</h1>
        {this.props.user.token ?
          this.renderLogin() :
          this.renderNotLogin()
        }
      </header>
    );
  }
}

Header.propTypes = propTypes;

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  link: PropTypes.string,
  iconName: PropTypes.string,
  title: PropTypes.string,
};

export default class NavItem extends Component {
  render() {
    return (
      <Link
        className="vp-header-nav__item"
        activeClassName="vp-header-nav__item--active"
        to={this.props.link}
        onlyActiveOnIndex={this.props.link === '/'}
      >
        <i className={`iconfont icon-${this.props.iconName} vp-header-nav__icon`} />
        <span>{`${this.props.title}`}</span>
      </Link>
    );
  }
}

NavItem.propTypes = propTypes;


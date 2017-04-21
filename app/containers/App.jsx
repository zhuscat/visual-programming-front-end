import React, { Component, PropTypes } from 'react';
import Header from '../components/header';
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
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

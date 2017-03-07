import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import '../styles/base.scss';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const store = configureStore();

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  app
);

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './containers/App';
import Editor from './containers/Editor';
import Login from './components/Login';
import requireAuth from './containers/highorder/RequireAuth';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={requireAuth(Editor)} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
);

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Editor from './containers/Editor';
import Login from './containers/login-form';
import SignupForm from './components/SignupForm';
import ProgramLibrary from './containers/program-library';

const getRoutes = (history, store) => {
  const requireAuth = (nexState, replace, callback) => {
    const { user: { token } } = store.getState();
    if (!token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nexState.location.pathname },
      });
    }
    callback();
  };
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Editor} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="signup" component={SignupForm} />
        <Route path="library" component={ProgramLibrary} onEnter={requireAuth} />
      </Route>
    </Router>
  );
};

export default getRoutes;

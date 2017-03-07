import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
  /* eslint-disable */
  return createStore(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
}

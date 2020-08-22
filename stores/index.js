import { compact } from 'lodash/fp';
import { createStore, compose, applyMiddleware } from 'redux';

import middlewares, { isServer } from './middlewares';
import rootReducer from './rootReducer';

const makeStore = initialState => {
  //const base = process.env.API_SERVER_URL || 'http://localhost:3003';
  const enhancers = compact([
    applyMiddleware(...middlewares),
    typeof window !== 'undefined' &&
      !isServer &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  ]);

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const newReducer = require('./rootReducer').default;

      store.replaceReducer(newReducer);
    });
  }

  return store;
};

export default makeStore;

import nprogressMiddleware from './nprogressMiddleware';
import reduxThunk from 'redux-thunk';
import { middleware as apiMiddleware } from 'redux-api-call';
import { middleware as apiReactionMiddleware } from './api-reaction';

const env = process.env.NODE_ENV || 'development';

export const isServer = !process.browser;

const logger = () => next => action => {
  isServer && env === 'development' && console.log('REDUX: %s', action.type);
  return next(action);
};

// export default [logger, reduxThunk, nprogressMiddleware];
export default [
  logger,
  reduxThunk,
  nprogressMiddleware,
  apiMiddleware,
  apiReactionMiddleware
];

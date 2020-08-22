import { compact, concat, flow, join } from 'lodash/fp';

// const Libs = require('./export');

// module.exports = Libs;

export const isServer = !process.browser;

export const createLink = flow(compact, concat(['']), join('/'));

export const getResetter = api =>
  typeof api === 'object' && api.resetter(['data', 'error']);

export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

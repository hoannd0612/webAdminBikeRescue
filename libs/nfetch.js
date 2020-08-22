import { flow, identity, join, map, pickBy, toPairs, trim } from 'lodash/fp';

import getHeaders from './getHeaders';

export const objectToQuery = flow(
  pickBy(identity),
  toPairs,
  map(val => `${val[0]}=${val[1]}`),
  join('&'),
  trim
);

const nfetch = ({ endpoint, method = 'POST', formData = false }) => (
  variables = {},
  opts = {}
) => {
  let curEndpoint = process.env.DOMAIN_SERVER + endpoint;
  console.log({ curEndpoint, headersOption: opts.headers });
  const formDataValue = new FormData();
  if (formData) {
    for (var key in variables) {
      formDataValue.append(key, variables[key]);
    }
  }

  if (method === 'GET') {
    const query = objectToQuery(variables);

    return {
      endpoint: query ? curEndpoint + '?' + query : curEndpoint,
      method,
      headers: getHeaders(opts.headers)
    };
  } else {
    return {
      endpoint: curEndpoint,
      method,
      headers: getHeaders(opts.headers),
      body: !formData ? JSON.stringify(variables) : formDataValue
    };
  }
};
export default nfetch;

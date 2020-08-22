import _getHeaders, { formatObj as _formatObj } from './getHeaders';
import _nfetch, { objectToQuery } from './nfetch';
import * as tokenLibs from './token-libs';
import * as languageLibs from './language-libs';

export const nfetch = _nfetch;
export const getHeaders = _getHeaders;
export const formatObj = _formatObj;

export const saveToken = tokenLibs.saveToken;
export const getToken = tokenLibs.getToken;
export const removeToken = tokenLibs.removeToken;

export const saveLanguage = languageLibs.saveLanguage;
export const getLanguage = languageLibs.getLanguage;
export const removeLanguage = languageLibs.removeLanguage;

export const objToQueryString = objectToQuery;

import { isServer } from './index';
const LANGUAGE_NAME = '_lang';

export const saveLanguage = language =>
  !isServer ? localStorage.setItem(LANGUAGE_NAME, language) : null;
export const getLanguage = () =>
  !isServer ? localStorage.getItem(LANGUAGE_NAME) : null;

export const removeLanguage = () =>
  !isServer ? localStorage.removeItem(LANGUAGE_NAME) : null;

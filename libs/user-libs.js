import { isServer } from '../utils';

const USER_ID = '_userID';

export const saveUserID = token =>
  !isServer && token ? localStorage.setItem(USER_ID, token) : null;

export const getUserID = () =>
  !isServer ? localStorage.getItem(USER_ID) : null;

export const removeUserID = () =>
  !isServer ? localStorage.removeItem(USER_ID) : null;

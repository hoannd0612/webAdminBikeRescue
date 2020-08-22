import { flow, split } from 'lodash/fp';

export const CHANGE_PATH = 'CHANGE_PAGE';
export const SELECT_PARENT_PATH = 'SELECT_PARENT_PATH';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

const drawerWidth = 256;

const getParentPaths = flow(split('/'), (paths) => paths[1] || '');

export default {
  parentPath: (state = '', { type, payload }) => {
    if (type === CHANGE_PATH) {
      return getParentPaths(payload);
    }
    if (type === SELECT_PARENT_PATH) {
      return payload;
    }

    return state;
  },
  showSidebar: (state = false, { type, payload }) => {
    if (type === TOGGLE_SIDEBAR) {
      return payload;
    }

    return state;
  },
  drawerWidth: (state = drawerWidth) => {
    return state;
  }
};

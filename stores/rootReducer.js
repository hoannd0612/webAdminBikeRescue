import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call';
import { reducer as formReducer } from 'redux-form';

import initialState from './initState';
import settingState from './SettingState';
import toastState from './ToastState';
import navigationState from './NavigationState';

export default combineReducers({
  ...initialState,
  ...apiReducers,
  ...settingState,
  ...toastState,
  ...navigationState,
  form: formReducer
});

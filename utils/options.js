import { TOP_RIGHT } from '../enums/toastPosition';
import { TOAST_SUCCESS } from '../enums/actions';
import Fade from '@material-ui/core/Fade';

export const DEFAULT_OPTION_TOAST = () => ({
  key: new Date().getTime() + Math.random(),
  options: {
    key: new Date().getTime() + Math.random(),
    variant: TOAST_SUCCESS,
    anchorOrigin: TOP_RIGHT,
    autoHideDuration: 4000,
    transitionDuration: {
      enter: 500,
      exit: 1000
    },
    TransitionComponent: Fade
  }
});

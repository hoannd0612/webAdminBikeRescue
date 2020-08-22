import React from 'react';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import makeStore from '../stores';
import { SnackbarProvider } from 'notistack';
import Notifier from '../stores/Notifier';
import { Close } from '@material-ui/icons';
import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const enhance = compose(withRedux(makeStore));
const notistackRef = React.createRef();

const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <LocalizationProvider dateAdapter={MomentUtils}>
        <Provider store={store}>
          <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
              <Close
                onClick={onClickDismiss(key)}
                style={{ color: 'white', cursor: 'pointer' }}
              />
            )}
          >
            <Notifier />
            <Component {...pageProps} />
          </SnackbarProvider>
        </Provider>
      </LocalizationProvider>
    );
  }
}

export default enhance(MyApp);

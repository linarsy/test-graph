import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import Header from './components/Header';
import Spreadsheet from './components/Spreadsheet';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext ? ext() : f => f;
/* eslint-enable */

const store = createStore(
  reducers,
  devtoolMiddleware,
);

export default () => {
  render(
    <Provider store={store}>
      <Header />
      <Spreadsheet />
    </Provider>,
    document.getElementById('root'),
  );
};

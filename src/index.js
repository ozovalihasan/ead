import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppModel from './components/AppModel';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppModel />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

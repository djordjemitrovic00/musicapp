import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import './main.scss';
import App from './App';
import store from './store';

import './i18n';
import ColorModeProvider from './context/ColorModeContext';

ReactDOM.render(
  <HelmetProvider>
    <React.StrictMode>
      <Provider store={store}>
        <ColorModeProvider>
            <App />
        </ColorModeProvider>
      </Provider>
    </React.StrictMode>
  </HelmetProvider>,
  document.getElementById('root'),
);

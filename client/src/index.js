import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { legacy_createStore as createstore, applyMiddleware, compose } from 'redux';
import {thunk} from "redux-thunk"
import reducers from './reducers';
import i18n from './i18next/i18n';
import { I18nextProvider } from 'react-i18next';

const store = createstore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
      <App />
      </I18nextProvider>
    </React.StrictMode>
  </Provider>
);


reportWebVitals();

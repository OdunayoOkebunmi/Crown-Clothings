import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { store, persistor } from './redux/store/store';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <PersistGate persistor={ persistor }>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
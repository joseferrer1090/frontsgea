import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';

console.log("globalstore",store.getState())
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>  
 ,
  document.getElementById('root')
);

import React, {Component} from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import {combineReducers, createStore, applyMiddleware} from "redux";
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './containers/app';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('app')
);
module.hot.accept();

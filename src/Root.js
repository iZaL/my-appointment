'use strict';
import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import App from './App';
import CodePush from "react-native-code-push";

export default class Root extends Component {

  constructor() {
    super();
    console.disableYellowBox=true;
    CodePush.sync();
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    )
  }
}
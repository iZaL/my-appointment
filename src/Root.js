'use strict';
import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import App from './App';
import CodePush from "react-native-code-push";
import {whyDidYouUpdate} from 'why-did-you-update';


export default class Root extends Component {

  constructor() {
    super();
    console.disableYellowBox=true;
    // CodePush.sync();
    // if (process.env.NODE_ENV !== 'production') {
    //   whyDidYouUpdate(React,{ exclude: /^YellowBox,^Connect/ });
    // }

  }

  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    )
  }
}
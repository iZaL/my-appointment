import React from 'react';
import { AppRegistry } from 'react-native';
import Root from './src/Root';
// delete GLOBAL.XMLHttpRequest;
console.disableYellowBox = true;

AppRegistry.registerComponent('MyAppointment', () => Root);
/**
 * @format
 */

// Filter console errors for ViewPropTypes BEFORE any imports
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('ViewPropTypes will be removed')
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

import { AppRegistry } from 'react-native';
import { buildTheme } from './config-theme.js';
import App from './App';

buildTheme();

AppRegistry.registerComponent('example', () => App);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  NativeModules
} from 'react-native';

import Messenger from './Messenger';
import { wrap } from './themes';

type Props = {};

@wrap
export default class App extends Component<Props> {
  render() {
    return (
      <View cls="flx-i jcc aic bg-#F5FCFF">
        <Messenger />
      </View>
    );
  }
}

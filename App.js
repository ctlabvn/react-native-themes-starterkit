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

import { wrap } from './themes';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

type Props = {};

@wrap
export default class App extends Component<Props> {
  render() {
    return (
      <View cls="flx-i jcc aic bg-#F5FCFF">
        <Text cls="f4 tc ma2">Welcome to React Native!</Text>
        <Text cls="tc red mb2">To get started, edit App.js</Text>
        <Text cls="tc red mb2">{instructions}</Text>
      </View>
    );
  }
}

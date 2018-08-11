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
  TextInput,
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
      <View cls="flx-i bg-#F5FCFF">
        <Messenger />
        <TextInput
          underlineColorAndroid="transparent"
          cls="ma2 h2"
          placeholder="Writing something..."
          multiline
          keyboardType="default"
        />
      </View>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View} from 'react-native';
import styles from './styles.js'
import HomeScreen from './HomeScreen'


export default class NavigatorScreen extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: HomeScreen,
          title: 'Flickies',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}
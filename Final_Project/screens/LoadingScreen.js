import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../styles';


loadingScreen = () => {
  return (
    <View style={styles.loadingScreen}>
      <ActivityIndicator size='large' color='red' />
    </View>
  )
}
export default loadingScreen;

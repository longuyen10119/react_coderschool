import styles from '../styles';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

const textDivider = ({ text }) => {
  return (
    <React.Fragment>

      <Text style={styles.textBetweenHairline}>{text}</Text>
      <View style={styles.hairline} />
    </React.Fragment>


  )
};

export default textDivider;
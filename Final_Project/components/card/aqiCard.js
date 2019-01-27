import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../styles.js'
import LoadingScreen from '../../screens/LoadingScreen';
// import Image from 'react-native-remote-svg'
import {
  imageDangerous,
  imageGood,
  imageModerate,
  imageUnhealthy,
  imageUnhealthySensitive,
  imageVeryUnhealthy
} from '../../assets/images/index.js';
export default class AqiCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const info = this.props.aqi;

    return (
      <View style={[styles.card, { backgroundColor: info.color }]}>
        <View style={styles.firstRow}>
          <View style={styles.leftSide}>
            {/* <Image 
              style={{ width: 120, height: 120 }}
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
            /> */}
            <Image
              style={{ width: 135, height: 135 }}
              source={info.imgPath}
            />
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.aqiStyle}>{info.aqi}</Text>
            <Text>{info.condition}</Text>
            <Text>Updated: {info.dayOfWeek} {''} {info.time}</Text>
            <Text>PM25: {info.pm25}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.location}>{info.city.name}</Text>
        </View>
      </View>
    );
  }
}







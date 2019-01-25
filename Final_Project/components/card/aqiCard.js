import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../styles.js'
import LoadingScreen from '../../screens/LoadingScreen';
import SvgUri from 'react-native-svg-uri'
export default class AqiCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const info = this.props.aqi;
    const svgImage = require('../../assets/images/rachael1.svg');
    return (
      <View style={[styles.card, { backgroundColor: info.color }]}>
        <View style={styles.firstRow}>
          <View style={styles.leftSide}>
            {/* <Image
              style={{ width: 120, height: 120 }}
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
            /> */}
            <SvgUri
              width="200"
              height="200"
              source={{ uri: svgImage }}
            />
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.aqiStyle}>{info.aqi}</Text>
            <Text>{info.condition}</Text>
            <Text>Updated {info.dayOfWeek} {' '} {info.time}</Text>
            <Text>pm25</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.location}>{info.city.name}</Text>
        </View>
      </View>
    );
  }
}







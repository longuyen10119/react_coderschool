import React, { Component } from 'react';
import { View, Text, Image, Animated } from 'react-native';
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
const ANIMATION_DURATION = 300;
const ROW_HEIGHT = 200;

export default class AqiCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this._animated = new Animated.Value(0);

  }
  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }
  onRemove = () => {
    const { onRemove } = this.props;
    if (onRemove) {
      Animated.timing(this._animated, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }).start(() => onRemove());
    }
  };

  render() {
    const info = this.props.aqi;
    const type = this.props.name;
    const typeStyle = (type == 'current') ? styles.card : styles.otherCard

    const rowStyles = [
      {
        padding: -10,
      },
      // styles.row,
      {
        height: this._animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ROW_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
      { opacity: this._animated },
      {
        transform: [
          { scale: this._animated },
          {
            rotate: this._animated.interpolate({
              inputRange: [0, 1],
              outputRange: ['35deg', '0deg'],
              extrapolate: 'clamp',
            })
          }
        ],
      },
    ];
    return (
      <Animated.View style={rowStyles}>

        <View style={[typeStyle, { backgroundColor: info.color }]}>
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
      </Animated.View>
    );
  }
}







import React from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles.js';
import AqiCard from '../components/card/aqiCard.js';
import AddButton from '../components/addButton';
import { Constants, Location, Permissions } from 'expo';
import LoadingScreen from './LoadingScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'AQI',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      aqi: [],
      location: null,
      card: null,
    };
    this.onTouchablePress.bind(this);
  }
  // sleep function to wait for API and display LOAD screen
  sleep = m => new Promise(r => setTimeout(r, m));
  componentWillMount() {
    this._getLocationAsync();
  }
  async componentDidMount() {
    await this.sleep(1000);

    const apiKey = `aaa897a24675dc5f2e87ad004b1d62eec6a33bbf`;
    const { latitude, longitude } = this.state.location.coords;
    const response = await fetch(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${apiKey}`);
    const aqi = await response.json();

    await this.sleep(1000);
    console.log(aqi);
    const number = aqi.data.aqi;
    let condition = '';
    //Set color and condition
    switch (true) {
      case (number > 300):
        condition = 'Hazardous';
        color = '#7e0023';
        break;
      case (number > 201):
        condition = 'Very Unhealthy';
        color = '#660099';
        break;
      case (number > 151):
        condition = 'Unhealthy';
        color = '#cc0033';
        break;
      case (number > 101):
        condition = 'Unhealthy for Sensitive Groups';
        color = '#ff9933';
        break;
      case (number > 51):
        condition = 'Moderate';
        color = '#ffde33';
        break;
      default:
        condition = 'Good';
        color = '#009966'
        break;
    };
    // Get the day of week
    const [date, time] = aqi.data.time.s.split(' ');
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let dtr = new Date(date);

    let aCard = {
      aqi: number,
      condition,
      time,
      dayOfWeek: weekday[dtr.getDay()],
      color,
      city: aqi.data.city,
    }
    this.setState({
      card: [aCard],
      isVisible: false,
    });
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  onTouchablePress = (item) => {
    // console.log(item);
    this.props.navigation.navigate('Map', {
      itemID: 100,
      item,
    });
  }
  render() {
    if (this.state.isVisible) {
      return (
        <LoadingScreen />
      )
    } else {
      return (
        <View style={styles.container}>
          {this.state.card.map((item, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => this.onTouchablePress(item)}>
                <AqiCard aqi={item} />
              </TouchableOpacity>
            )
          })}

          <View style={styles.addButton}>
            <TouchableOpacity>
              <AddButton />
            </TouchableOpacity>
          </View>

        </View >
      );
    }
  }
}

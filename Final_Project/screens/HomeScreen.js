import React from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles.js';
import AqiCard from '../components/card/aqiCard.js';
import AddButton from '../components/addButton';
import CloseButton from '../components/closeButton';

import { Constants, Location, Permissions } from 'expo';
import LoadingScreen from './LoadingScreen';
import {
  imageDangerous,
  imageGood,
  imageModerate,
  imageUnhealthy,
  imageUnhealthySensitive,
  imageVeryUnhealthy
} from '../assets/images/index';
import Divider from 'react-native-divider';
import TextDivider from '../components/textDivider';

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
      refreshing: false,
      isVisible: true,
      aqi: [],
      location: null,
      card: [],
      cards: [],
    };
    this.onTouchablePress.bind(this);
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }
  // sleep function to wait for API and display LOAD screen
  sleep = m => new Promise(resolve => setTimeout(resolve, m));
  componentWillMount() {
    // this._getLocationAsync();
  }
  fetchAPI = async (coords) => {
    const apiKey = `aaa897a24675dc5f2e87ad004b1d62eec6a33bbf`;
    const { latitude, longitude } = coords;
    const response = await fetch(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${apiKey}`);
    const aqi = await response.json();
    return aqi;
  }
  parsingAqi = async (aqi) => {
    const number = aqi.data.aqi;
    let condition = '';
    let imgPath = '';
    //Set color and condition
    switch (true) {
      case (number > 300):
        condition = 'Hazardous';
        color = '#7e0023';
        imgPath = imageDangerous;
        break;
      case (number > 201):
        condition = 'Very Unhealthy';
        color = '#660099';
        imgPath = imageVeryUnhealthy;
        break;
      case (number > 151):
        condition = 'Unhealthy';
        color = '#cc0033';
        imgPath = imageUnhealthy;
        break;
      case (number > 101):
        condition = 'Unhealthy for Sensitive Groups';
        color = '#ff9933';
        imgPath = imageUnhealthySensitive;
        break;
      case (number > 51):
        condition = 'Moderate';
        color = '#ffde33';
        imgPath = imageModerate;
        break;
      default:
        condition = 'Good';
        color = '#009966'
        imgPath = imageGood;
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
      imgPath,
      pm25: aqi.data.iaqi.pm25.v,
    }
    return aCard;
  };

  async componentDidMount() {
    this._getLocationAsync()
      .then(result => this.fetchAPI(result))
      .then(result => this.parsingAqi(result))
      .then(result => {
        this.setState({
          isVisible: false,
          card: [result],
        });
      })
      .catch((error) => console.log(error));

  }
  addingFromAddScreen = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    if (item !== undefined) {
      let coord = {
        latitude: item.city.geo[0],
        longitude: item.city.geo[1]
      }
      this.fetchAPI(coord)
        .then(result => this.parsingAqi(result))
        .then(result => {
          console.log(result);
          this.setState({
            cards: [...this.state.cards, result]
          });
          console.log('Cards state');
          console.log(this.state.cards);
        })
        .catch(error => console.log(errror));
    }
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    return location.coords;
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
              <ScrollView
                style={{
                  flexGrow: 0.05,
                  borderBottomColor: 'gray',
                  paddingBottom: 0,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
                key={i}>
                <TouchableOpacity key={i} onPress={() => this.onTouchablePress(item)}>
                  <AqiCard name='current' aqi={item} />
                </TouchableOpacity>
              </ScrollView>
            )
          })}
          {/* {this.state.cards.map((item, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => this.onTouchablePress(item)}>
                <AqiCard aqi={item} />
              </TouchableOpacity>
            )
          })} */}

          <FlatList
            data={this.state.cards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.onTouchablePress(item)}>
                <AqiCard name='saved' aqi={item} />
              </TouchableOpacity>
            )}
          />
          <View style={styles.addButton}>
            <TouchableOpacity onPress={
              () => this.props.navigation.navigate('Add', { addCall: this.addingFromAddScreen.bind(this) })
            }>
              <AddButton />
            </TouchableOpacity>
          </View>

        </View >
      );
    }
  }
}

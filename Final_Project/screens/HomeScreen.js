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
  Button,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles.js';
import AqiCard from '../components/card/aqiCard.js';
import AddButton from '../components/addButton';
import CloseButton from '../components/closeButton';
import Swipeout from 'react-native-swipeout';
import { Constants, Location, Permissions } from 'expo';
import LoadingScreen from './LoadingScreen';
// import database from '../Fire';

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
    console.log('IN FETCH API')
    console.log(aqi);
    return aqi;
  }
  parsingAqi = async (aqi) => {
    const number = aqi.data.aqi;
    let condition = '';
    let imgPath = '';
    console.log('IN Parsing AQI')
    console.log(aqi);
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
    let pm10, no2, o3;
    try {
      pm10 = (aqi.data.iaqi.pm10.v);
      no2 = (aqi.data.iaqi.no2.v);
      o3 = (aqi.data.iaqi.o3.v);
    }
    catch (error) {
      console.log(error);
      pm10 = ' ';
      no2 = '';
      o3 = ''
    }

    let aCard = {
      aqi: number,
      condition,
      time,
      dayOfWeek: weekday[dtr.getDay()],
      color,
      city: aqi.data.city,
      imgPath,
      pm10,
      o3,
      no2,
    }
    console.log(aCard);
    return aCard;
  };
  updateSavedCards = async (...restArgs) => {
    console.log('UPDATER SDAVE DCARDs');
    if (restArgs.length == 1) {
      let updateCards = [];
      restArgs[0].map((item, i) => {
        console.log('iterating in update save careds')
        console.log(item);
        console.log(item.city.geo[0], item.city.geo[1]);
        this.fetchAPI(item.city.geo[0], item.city.geo[1])
          .then(result => this.parsingAqi(result))
          .then(result => updateCards.push(result))

      });
      return updateCards;
    }

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
      .then(() => this.sleep(500))
      .then(() => AsyncStorage.getItem('cards'))
      .then(result => JSON.parse(result))
      .then(result => this.updateSavedCards(result))
      .then(json => this.setState({
        cards: [...json],
      }))
      .catch((error) => console.log('Componnent did mount' + error));

  }
  updateAsyncStorage = async () => {
    console.log('In UPDATE ASYNC STORAGE');
    return AsyncStorage.setItem('cards', JSON.stringify(this.state.cards))
  }
  addingFromAddScreen = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    // console.log('IN addingFromAddScreen');
    // console.log(item);
    if (item !== undefined) {
      let coord = {
        latitude: item.city.geo[0],
        longitude: item.city.geo[1]
      }
      this.fetchAPI(coord)
        .then(result => this.parsingAqi(result))
        .then(result => {
          // console.log('After PARSING AQI')
          // console.log(result);
          this.setState({
            cards: [...this.state.cards, result]
          });
          this.props.navigation.setParams({ item: undefined });
        })
        .then(() => this.updateAsyncStorage())
        .catch(error => console.log('Adding fromm add screen' + errror));
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
      cards: this.state.cards,
    });
  };
  onTouchableLongPress = (item) => {
    let found = false
    for (let card of this.state.cards) {
      if (card.city.name === item.city.name) {
        found = true;
        break;
      };
    }
    if (!found) {
      this.setState({
        cards: [...this.state.cards, item]
      });
      this.updateAsyncStorage()
    } else {
      alert('Already in your List');
    }

  };

  deleteCard = (item) => {
    const newCards = this.state.cards.filter(x => (x.city.name !== item.city.name));
    this.setState({
      cards: [...newCards],
    }, () => this.updateAsyncStorage());
  };
  render() {
    // let swipeBtns = [{
    //   text: 'Delete',
    //   backgroundColor: '#f4511e',
    //   borderRadius: 20,
    //   paddingTop: 10,
    //   underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    //   onPress: () => { alert('Delete') }
    // }];
    if (this.state.isVisible) {
      return (
        <LoadingScreen />
      )
    } else {
      return (
        <View style={styles.container}>

          {this.state.card.map((item, i) => {
            return (
              <TouchableOpacity
                onLongPress={() => this.onTouchableLongPress(item)}
                key={i}
                onPress={() => this.onTouchablePress(item)}>
                <AqiCard name='current' aqi={item} />
              </TouchableOpacity>
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
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
            data={this.state.cards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Swipeout
                right={[{
                  text: 'Delete',
                  backgroundColor: '#f4511e',
                  borderRadius: 20,
                  paddingTop: 10,
                  // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                  onPress: () => { this.deleteCard(item) }
                }]}
                autoClose={true}
                backgroundColor='transparent'
                style={{ paddingBottom: 5, paddingTop: -5 }}
              >
                <TouchableOpacity onPress={() => this.onTouchablePress(item)}>

                  <AqiCard name='saved' aqi={item} />

                </TouchableOpacity>
              </Swipeout>

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

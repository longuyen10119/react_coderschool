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
import { fetchAPI, parsingAqi } from '../helper';

// import {
//   imageDangerous,
//   imageGood,
//   imageModerate,
//   imageUnhealthy,
//   imageUnhealthySensitive,
//   imageVeryUnhealthy
// } from '../assets/images/index';
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
  updateSavedCards = async (...restArgs) => {
    const result = await AsyncStorage.getItem('cards');
    const json = JSON.parse(result);
    const promises = json.map(async (item) => {
      const temp = await fetchAPI({ latitude: item.city.geo[0], longitude: item.city.geo[1] });
      const json = await parsingAqi(temp);
      return json;
    });
    const newCards = await Promise.all(promises);
    this.setState({
      cards: [...newCards],
    });
  };
  async componentDidMount() {
    this._getLocationAsync()
      .then(result => fetchAPI(result))
      .then(result => parsingAqi(result))
      .then(result => {
        this.setState({
          isVisible: false,
          card: [result],
        });
      })
      .then(() => this.sleep(500))
      .then(() => this.updateSavedCards())
      .catch((error) => console.log('Componnent did mount' + error));

  }
  updateAsyncStorage = async () => {
    return AsyncStorage.setItem('cards', JSON.stringify(this.state.cards))
  }
  addingFromAddScreen = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    if (item !== undefined) {
      let coord = {
        latitude: item.city.geo[0],
        longitude: item.city.geo[1]
      }
      fetchAPI(coord)
        .then(result => parsingAqi(result))
        .then(result => {
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
      },
        () => this.updateAsyncStorage()
      );
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

          {/* {this.state.card.map((item, i) => {
            return (
              <TouchableOpacity
                onLongPress={() => this.onTouchableLongPress(item)}
                key={i}
                onPress={() => this.onTouchablePress(item)}>
                <AqiCard name='current' aqi={item} />
              </TouchableOpacity>
            )
          })} */}
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
            ListHeaderComponent={
              <TouchableOpacity
                onLongPress={() => this.onTouchableLongPress(this.state.card[0])}
                onPress={() => this.onTouchablePress(this.state.card[0])}>
                <AqiCard name='current' aqi={this.state.card[0]} />
              </TouchableOpacity>
            }
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

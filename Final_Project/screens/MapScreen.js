import React, { Component } from 'react';
import { WebView, Text, View, Modal, TouchableHighlight, Dimensions } from 'react-native';
import { MapView, Permissions } from 'expo';
import styles from '../styles'
import AqiCard from '../components/card/aqiCard'
import CloseButton from '../components/closeButton';
// import { WebView } from "react-native-webview";
import { fetchAPIMap, fetchAPI, parsingAqi, parsingForMapScreen } from '../helper';

export class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor() {
    super();
    this.state = {
      showCard: false,
      modalVisible: false,
      region: null,
      markers: [],
      initialRegion: {},
      cards: [],
      chosenMarker: null,
    }
    this.onPressMarker.bind(this);

  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  onPressMarker = async (item) => {
    console.log('PRESSED MARKER');
    const data = await fetchAPI({ latitude: item.lat, longitude: item.lon });
    const parsedInfo = await parsingAqi(data);
    console.log(parsedInfo);
    const setState = await this.setState({
      chosenMarker: { ...parsedInfo },
      modalVisible: true,
    })
    // this.setState({ showCard: true });
  };
  componentWillMount = async () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    // console.log(item);
    let cards = navigation.getParam('cards');
    // check if item is inside cards (for rendering purpose)
    let found = false;
    for (let card of cards) {
      if (card.city.name === item.city.name) {
        found = true;
        break;
      }
    }
    if (!found) {
      cards = [...cards, item];
    };
    this.setState({
      cards: [...cards],
      chosenMarker: { ...item }
    });
    const window = Dimensions.get('window');
    const { width, height } = window;
    const latitudeDelta = 12;
    const longitudeDelta = latitudeDelta * (width / height);

    this.setState({
      initialRegion: {
        latitude: item.city.geo[0],
        longitude: item.city.geo[1],
        latitudeDelta,
        // longitudeDelta: 0.0421,
        longitudeDelta,
      }
    });

  };
  onRegionChangeComplete = async (region) => {
    this.setState({ region });
    const result = await fetchAPIMap(region);
    // result contains data, data is an array of 
    const returnData = await parsingForMapScreen(result);
    this.setState({
      markers: [...returnData],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={{ flex: 1, alignSelf: 'stretch', height: 400 }}
          initialRegion={this.state.initialRegion}>

          {this.state.markers.map((item, i) => {
            return (
              <MapView.Marker
                key={i}
                onPress={() => this.onPressMarker(item)}
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lon,
                }}>
                {/* <MapView.Callout tooltip={true} >
                  <Text>helloooooo</Text>
                </MapView.Callout> */}

                <View style={[styles.marker, { backgroundColor: item.color }]}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{item.aqi}</Text>
                </View>
                <View style={[styles.arrow, { borderBottomColor: item.color }]} />
              </MapView.Marker>
            )
          })}
        </MapView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <WebView
                source={{ uri: this.state.chosenMarker.city.url }}
                style={{ flex: 1, marginTop: 25 }}
                onLoadProgress={e => console.log(e.nativeEvent.progress)}
              />

              <View style={styles.addButton}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <CloseButton />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View >
    )
  }
}

export default MapScreen;

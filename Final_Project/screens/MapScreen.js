import React, { Component } from 'react';
import { WebView, Text, View, Modal, TouchableHighlight, Dimensions } from 'react-native';
import { MapView, Permissions } from 'expo';
import styles from '../styles'
import CloseButton from '../components/closeButton';
// import { WebView } from "react-native-webview";


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
      modalVisible: false,
    }
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    const window = Dimensions.get('window');
    const { width, height } = window;
    const latitudeDelta = 2;
    const longitudeDelta = latitudeDelta * (width / height);
    console.log(longitudeDelta);
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1, alignSelf: 'stretch', height: 400 }}
          initialRegion={{
            latitude: item.city.geo[0],
            longitude: item.city.geo[1],
            latitudeDelta,
            // longitudeDelta: 0.0421,
            longitudeDelta,
          }}>

          <MapView.Marker
            onPress={this.setModalVisible}
            coordinate={{
              latitude: item.city.geo[0],
              longitude: item.city.geo[1],
            }}>
            <View style={[styles.marker, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{item.aqi}</Text>
            </View>
            <View style={[styles.arrow, { borderBottomColor: item.color }]} />
          </MapView.Marker>


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
                source={{ uri: item.city.url }}
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

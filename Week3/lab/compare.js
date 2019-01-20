import React from 'react';
import { MapView } from 'expo';
import { Platform, Text, View, StyleSheet } from 'react-native';

export default class Map extends React.Component {


    constructor() {
        super();
        this.state = {
            locations: [
                {
                    latitude: 37.77580109392105,
                    longitude: -122.43598475293318,
                }
            ],
        }
    }
    onLongPress = (e) => {

        this.setState({
            locations: [...this.state.locations, e.nativeEvent.coordinate]
        });
        // console.log(this.state.locations);
    }

    render() {
        // const temp = this.props.coord;
        // console.log(this.state.locations)
        return (
            <View>
                <Text>{this.state.locations.length}</Text>
                <MapView
                    style={{
                        flex: 1,
                        width: 400,
                        height: 200,
                    }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                // onLongPress={this.onLongPress}
                >
                    {
                        this.state.locations.length > 0 &&
                        this.state.locations.map(location => {
                            return (
                                <MapView.Marker
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.lon,
                                    }}
                                />
                            )
                        })
                    }

                </MapView>
            </View>
        )
    }
}
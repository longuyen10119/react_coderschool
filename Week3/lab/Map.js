import React from 'react';
import { MapView, ImagePicker, Permissions } from 'expo';
import { Platform, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import uuid from 'uuid'
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
			image: '',
		}
	}
	onLongPress = (e) => {
		this.setState({
			locations: [...this.state.locations, e.nativeEvent.coordinate]
		});
	}
	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		// you would probably do something to verify that permissions
		// are actually granted, but I'm skipping that for brevity
	};
	pickImage = async () => {
		await this.askPermissionsAsync();
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});

		console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result.uri });
		}
	};

	render() {
		const { latitude, longitude } = this.props.initialLoc;
		return (
			<View>
				<MapView
					style={{
						flex: 1,
						width: 400,
						height: 200,
					}}
					initialRegion={{
						latitude,
						longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					onLongPress={this.onLongPress}
				>
					<MapView.Marker coordinate={{
						latitude,
						longitude,
					}} />
					{
						this.state.locations.map((location) => {
							return (
								<MapView.Marker
									coordinate={{
										latitude: location.latitude,
										longitude: location.longitude,
									}}
								>
									<MapView.Callout
										tooltip={true}
									// onPress={this.pickImage}
									>
										<View style={{
											height: 250,
											width: 100,
											backgroundColor: 'white',
											borderRadius: 80
										}}>
											<TouchableOpacity 
												style={{
													flex: 1,
													justifyContent: 'center'
												}} 
												onPress={this.pickImage}>
												<Text>Hello</Text>
												{/* {
													this.state.image.length === '' ? (
															<Text>Add Image...</Text>
													) : (
															<Image
																style={{ flex: 1 }}
																source={{ uri: this.state.image }}
															/>
													 )
												} */}
											</TouchableOpacity>

										</View>

									</MapView.Callout>
								</MapView.Marker>
							)
						})
					}

				</MapView>
			</View>
		)
	}
}
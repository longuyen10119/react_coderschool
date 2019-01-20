import React from 'react';
import { MapView, ImagePicker, Permissions } from 'expo';
import { Platform, Text, View, StyleSheet, TouchableOpacity, Image, navigator, Dimensions } from 'react-native';
import uuid from 'uuid';
import Lightbox from 'react-native-lightbox';
import { HitTestResultTypes } from 'expo/build/AR';

export default class Map extends React.Component {


	constructor() {
		super();
		this.state = {
			locations: [
				{
					latitude: 37.77580109392105,
					longitude: -122.43598475293318,
					image: '',
				}
			],
			imageSize: {
				width: 100,
				height: 250,
				borderRadius: 20,
			},
		}
	}
	onLongPress = (e) => {
		let newLoc = {
			latitude: e.nativeEvent.coordinate.latitude,
			longitude: e.nativeEvent.coordinate.longitude,
			image: '',
		}
		this.setState({
			locations: [...this.state.locations, newLoc]
		});

	}
	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		// you would probably do something to verify that permissions
		// are actually granted, but I'm skipping that for brevity
	};

	pickImage = async (loc) => {
		await this.askPermissionsAsync();
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});
		const { latitude, longitude } = loc;
		let newLocWithImage = {
			latitude,
			longitude,
			image: result.cancelled == false ? result.uri : '',
		}
		this.setState({
			locations: [...this.state.locations.filter(x => (x.latitude != loc.latitude && x.longitude != loc.longitude)), newLocWithImage]
		});
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>');
		console.log(this.state.locations);
		// if (!result.cancelled) {
		// this.setState({ image: [...this.state.image, result.cancelled==false ? result.uri : 'cancelled'] });
		// } 
	};

	render() {
		const { latitude, longitude } = this.props.initialLoc;
		const { width, height } = Dimensions.get('screen')
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
						image: '',
					}}>
						<MapView.Callout tooltip={true} onPress={() => this.pickImage(this.props.initialLoc)}>
						</MapView.Callout>
					</MapView.Marker>
					{
						this.state.locations.map((location) => {
							const temp = location
							return (
								<MapView.Marker
									coordinate={{
										latitude: location.latitude,
										longitude: location.longitude,
									}}
								>
									<MapView.Callout
										tooltip={true}
									>
										<View style={{
											height: 250,
											width: 100,
											backgroundColor: 'white',
											borderRadius: 80
										}}>

											{
												location.image == '' ? (
													<TouchableOpacity
														style={{
															flex: 1,
															justifyContent: 'center'
														}}
														onPress={() => this.pickImage(location)}
													>
														<Text>Add Image...</Text>
													</TouchableOpacity>

												) : (
														<Lightbox
															navigator={navigator}
															onOpen={() => this.setState({
																imageSize: { height, width, borderRadius: 0 }
															})}
															onClose={() => this.setState({
																imageSize: {
																	width: 100,
																	height: 250,
																	borderRadius: 20,
																}
															})}
														>
															<Image
																style={this.state.imageSize}
																source={{ uri: location.image }}
															/>
														</Lightbox>
													)
											}


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
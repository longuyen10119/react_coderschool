import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { Facebook } from 'expo';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onPressNavigate = () => {
    this.props.navigation.navigate('Chat')
  }
  logIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('384479855663925', {
        permissions: ['public_profile'],
      });
      console.log('........');
      console.log(token);
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const responseJSON = await response.json();

        // Try to get profile pic
        const userID = responseJSON.id;

        const profilePic = await fetch(`https://graph.facebook.com/${userID}/picture?type=large&redirect=false`);
        // console.log(profilePic);
        const temp = JSON.parse(profilePic._bodyText);
        const url = temp.data.url;
        console.log(url);

        this.props.navigation.navigate('Chat', { name: responseJSON.name, url });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.logIn} >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Go to Chat Screen </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

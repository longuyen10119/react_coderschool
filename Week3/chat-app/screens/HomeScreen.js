import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onPressNavigate = ()=>{
    this.props.navigation.navigate('Chat')
  }
  render() {
    return (
      <View>
          <TouchableOpacity onPress={this.onPressNavigate} >
              <Text> textInComponent </Text>
              </TouchableOpacity>
      </View>
    );
  }
}

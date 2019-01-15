import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Hello You're in details </Text>
      </View>
    );
  }
}

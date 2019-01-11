import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';

export default class TumblrPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const img = this.props.post.trail[0].blog.theme.header_image;
    // console.log(this.props.post)
    return (
      <View>
        <Image
          style={{width: 350, height: 350, borderRadius: 20, borderWidth:5}}
          source={{uri: img}}
        />
      </View>
    );
  }
}

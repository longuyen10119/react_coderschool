import React, { Component } from 'react';
import { View, Text, FlatList ,ActivityIndicator} from 'react-native';
import TumblrPost from './TumblrPost.js';




export default class TumblrList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    
      <View>
        <FlatList
            data={this.props.posts}
            keyExtractor={(post) => post.id.toString()}
            refreshing={this.props.loading}
            onRefresh={this.props.loadMore}
            onEndReachedThreshold={0.05}
            onEndReached={this.props.loadMore}          
            renderItem={(postItem) => {
                return <TumblrPost post= {postItem.item}/>
            }}
            ListFooterComponent={() =>
                <View>
                    <ActivityIndicator size="large" />
                </View>
            }
        />
      </View>
    );
  }
}

import React from 'react';
import TEST_DATA from './data.json';
import TumblrList from './tumblrList.js';
import TumblrPost from './TumblrPost.js';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      posts: [],
      loading: false,
      page: 0,
    };
  }
  async fetchWithPage(page) {
    // change fetch URL to use &offset=${page * 4} 
    const apiUrl = 'https://api.tumblr.com/v2/blog/itzahann/posts/photo'
    const apiKey = '779RldqZK31ib4Bz6dOfqiIMRaZ874ySoHjk0PkQAJhUBdtR0b'

    const response = await fetch(`${apiUrl}?api_key=${apiKey}&limit=4&offset=${page * 4}`);
    const data = await response.json();
    this.setState({
      posts: [...data.response.posts],
      loading: false,
    });
  }
  async loadMore() {
    console.log('test loadmore')
    const newPage = this.state.page + 1;
    await this.fetchWithPage(newPage);
    this.setState({ page: newPage });
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    this.fetchWithPage(0);
  }
  render() {
    console.log('....render');
    return (
      <View style={styles.container}>
        <TumblrList
          posts={this.state.posts}
          loadMore={this.loadMore}
          loading={this.state.loading}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

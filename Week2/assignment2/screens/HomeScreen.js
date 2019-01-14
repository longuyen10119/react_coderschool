import React from 'react';
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
import { Card, Title, Paragraph, Button, Dialog, Portal } from 'react-native-paper';
import nowPlaying from '../now_playing.json'
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(){
    super();
    this.state = {
      moviesList: [],
      isVisible: true,
      collapsed: true,
      nowplaying_api: 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed',
      highres_api: 'https://image.tmdb.org/t/p/original',
      dialogVisible: false,
    };
  }
  _showDialog = () => this.setState({ dialogVisible: true });
  _hideDialog = () => this.setState({ dialogVisible: false });

  sleep = m => new Promise(r => setTimeout(r,m));
  async componentDidMount () {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    const movieData = await response.json();
    await this.sleep(1000)
    this.setState({
      moviesList: movieData.results,
      isVisible: false,
      content: 'Now playing',
    })
    console.log(this.state.moviesList);
  } 
  
  render() {
    const {results, page, total_page} =nowPlaying;
    return (
      <View style={styles.container}>
        
        <StatusBarBackground style={{backgroundColor:'white'}}/>
        
        <FlatList
          data={this.state.moviesList}
          renderItem={({ item }) => (
            <View style={styles.card}>
            <Card elevation={30}>
              <TouchableOpacity>
              <Card.Cover style={{height:300}} source={{ uri: 'https://image.tmdb.org/t/p/w342' + item.poster_path }} />
              <Card.Content>
                  <Title>{item.title}</Title>
                <Paragraph>{item.overview}</Paragraph>
              </Card.Content>
              </TouchableOpacity>
              
            </Card>
            </View>
          )}
        />
      </View>
    );
  }
  
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
class StatusBarBackground extends React.Component{
  render(){
    return(
      <View style={[styles.statusBarBackground, this.props.style || {}]}>
      </View>
    );
  }
}
// class fullResDialog extends React.Component{
//   render() {
//     return (
//       <View>
//         <Portal>
//           <Dialog
//              visible={this.state.visible}
//              onDismiss={this._hideDialog}>
//             <Dialog.Content>
//               <Image
//               source={require('/react-native/img/favicon.png')}
//               />
//             </Dialog.Content>
//             <Dialog.Actions>
//               <Button onPress={this._hideDialog}>Done</Button>
//             </Dialog.Actions>
//           </Dialog>
//         </Portal>
//       </View>
//     );
//   }
// }
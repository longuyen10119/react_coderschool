import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  NavigatorIOS,
} from 'react-native';
import PropTypes from 'prop-types';
import { Card, Title, Paragraph, Button, Dialog, Portal } from 'react-native-paper';
import { WebBrowser } from 'expo';
import styles from './styles.js'
import { MonoText } from '../components/StyledText';
import Movie from './movie.js'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props, context) {
    super(props, context);
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

  sleep = m => new Promise(r => setTimeout(r, m));

  async componentDidMount() {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    const movieData = await response.json();
    await this.sleep(2000)
    this.setState({
      moviesList: movieData.results,
      isVisible: false,
      content: 'Now playing',
    })
  }

  render() {
    return (
      this.state.isVisible === true ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
          <View style={styles.container}>
            <StatusBarBackground style={{ backgroundColor: 'white' }} />
            <FlatList
              data={this.state.moviesList}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Details')}>
                  <Movie item={item} />
                </TouchableOpacity>
                
              )}
            />
          </View>
        )

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
class StatusBarBackground extends React.Component {
  render() {
    return (
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
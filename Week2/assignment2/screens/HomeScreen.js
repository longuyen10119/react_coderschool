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
class fullResDialog extends React.Component{
  render() {
    return (
      <View>
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Content>
              <Image
              source={require('/react-native/img/favicon.png')}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  card: {
    borderRadius: 60,
    padding: 5,
    elevation: 30,
  },
});

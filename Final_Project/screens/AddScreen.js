import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { SearchBar, ListItem } from 'react-native-elements';
class AddScreen extends Component {
  static navigationOptions = {
    title: 'Search',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      searchText: '',
      results: [],
    };
    this.setSearchText.bind(this);
    this.onBlurText.bind(this);
    this.onFocusSearch.bind(this);
  }
  getSearchResults = async () => {
    console.log('Running fetch');
    const apiKey = `aaa897a24675dc5f2e87ad004b1d62eec6a33bbf`;
    const query = this.state.searchText;
    const response = await fetch(`https://api.waqi.info/search/?token=${apiKey}&keyword=${query}`);
    const resJSON = await response.json();
    return resJSON;
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
  parsingAqi = (results) => {
    let newResults = [];
    for (let item of results) {
      let number = parseInt(item.aqi) || 0;
      let condition = '';
      switch (true) {
        case (number > 300):
          condition = 'Hazardous';
          color = '#7e0023';
          // imgPath = imageDangerous;
          break;
        case (number > 201):
          condition = 'Very Unhealthy';
          color = '#660099';
          // imgPath = imageVeryUnhealthy;
          break;
        case (number > 151):
          condition = 'Unhealthy';
          color = '#cc0033';
          // imgPath = imageUnhealthy;
          break;
        case (number > 101):
          condition = 'Unhealthy for Sensitive Groups';
          color = '#ff9933';
          // imgPath = imageUnhealthySensitive;
          break;
        case (number > 51):
          condition = 'Moderate';
          color = '#ffde33';
          // imgPath = imageModerate;
          break;
        default:
          condition = 'Good';
          color = '#009966'
          // imgPath = imageGood;
          break;
      };
      // Get the day of week
      const [date, time] = item.time.stime.split(' ');
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      let dtr = new Date(date);
      let newItem = {
        aqi: number,
        condition,
        time,
        dayOfWeek: weekday[dtr.getDay()],
        color,
        city: item.station,
        // imgPath,
        // pm25: aqi.data.iaqi.pm25.v,
      }
      newResults.push(newItem);
    }
    return newResults;
  };
  onBlurText = (e) => {
    this.getSearchResults().then(
      result => {
        if (result.data !== null) {
          console.log(result.data);
          const parsedResults = this.parsingAqi(result.data);
          console.log(parsedResults);
          this.setState({
            results: [...parsedResults],
          });
        }
      },
      error => console.log(error)
    );

  };
  onFocusSearch = (e) => {
    this.setState({
      results: [],
    });
  };
  setSearchText = (e) => {
    let searchText = e;
    this.setState({ searchText });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          round
          clearButtonMode='while-editing'
          clearTextOnFocus={true}
          keyboardAppearance='dark'
          keyboardType='web-search'
          searchIcon={{ size: 24 }}
          onBlur={(e) => this.onBlurText(e)}
          onChangeText={(e) => (this.setSearchText(e))}
          onClear={console.log('')}
          placeholder='Search...'
          onFocus={(e) => (this.onFocusSearch(e))} />

        <FlatList
          data={this.state.results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem
              component={TouchableOpacity}
              onPress={() => { console.log('Pressed') }}
              wrapperStyle={{ flexDirection: 'row-reverse' }}
              badge={
                {
                  value: item.aqi,
                  containerStyle: {
                    paddingRight: 16,
                    backgroundColor: item.color
                  }
                }
              }
              rightIcon={<View style={{ paddingLeft: 16 }} />}
              title={item.city.name}



            />
          )}
        />
      </SafeAreaView>
    );
  }
}

export default AddScreen;

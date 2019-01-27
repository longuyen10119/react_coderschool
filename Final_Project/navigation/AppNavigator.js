import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/HomeScreen';
import Add from '../screens/AddScreen';
import Map from '../screens/MapScreen';



const Navigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Map: {
    screen: Map,
  },
  Add: {
    screen: Add,
  },
})
export default Navigator;
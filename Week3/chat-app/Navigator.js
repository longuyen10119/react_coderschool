import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/HomeScreen.js'
import Chat from './screens/ChatScreen.js'

const Navigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Chat: {
        screen: Chat
    }
})
export default Navigator;
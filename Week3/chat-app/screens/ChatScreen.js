import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import database from '../Fire';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          text: 'Hello',
          user: {
            id: 'Long D. Nguyen'
          }
        }
      ]
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chat',
    };
  };
  componentDidMount = async () => {
    const messagesRef = database.ref('messages').limitToLast(20);
    messagesRef.on('child_added', snapShot => {
      const { text, user } = snapShot.val();
      const { key: id } = snapShot;
      const message = {
        text,
        user,
        id,
      }
      console.log('Message added');
      console.log(message);
      this.setState({
        messages: [message, ...this.state.messages]
      });
      console.log('Messages array -------');
      console.log(this.state.messages);
    })

  }
  onSendMessage = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user
      }
      database.ref('messages').push(message);
    }
  }

  render() {
    const { navigation } = this.props;
    const userName = navigation.getParam('name', 'Failed to get name');
    const url = navigation.getParam('url', 'Failed to get profile pic');
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: .2, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#5F9EA0', flexDirection: 'row', padding: 10 }}>
          <Image
            style={{
              width: 100, height: 100, borderRadius: 30, padding: 5
            }}
            source={{ uri: url }}
          />
          <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5 }}>Hello, {userName}</Text>
        </View>

        <View style={{ flex: .8, flexDirection: 'column', padding: 5 }}>
          <GiftedChat
            messages={this.state.messsages}
            onSend={this.onSendMessage}
            user={{
              id: userName,
            }}
          // renderAvatar={true}
          />
        </View>
      </View>

    )
  }
}

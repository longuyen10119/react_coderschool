import React, { Component } from 'react';
import { View, Text } from 'react-native';
import database from '../Fire';
import GiftedChat, { InputToolbar } from 'react-native-gifted-chat';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: []
    };
  }

  componentWillMount = () =>{
      const messagesRef = databse.ref('messages').limitToLast(20);
      messagesRef.on('child_added', snapShot =>{
        const {text, user} = snapShot.val();
        const {key: _id} = snapShot;
        const message ={
            text,
            user,
            _id,
        }
        this.setState({
            messages: [message,...this.state.messages]
        })
      })

  }
  onSendMessage = (message) =>{
      console.log(message)
  }

  render() {
    return (
      <GiftedChat
        messages={}
        onSend={this.onSendMessage}
        user={{
            id: 1,
        }}
        renderAvatar={true}
      />
    );
  }
}

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Dialog, Portal } from 'react-native-paper';
import styles from './styles.js'
import PropTypes from 'prop-types';
import Details from './details.js'

// export default class Movie extends Component {
//     render() {
//         return (
//             <View style={styles.card}>
//                 <Card elevation={30}>
//                     {/* <TouchableOpacity onPress={this._onForward}> */}
//                         <Card.Cover style={{ height: 300 }} source={{ uri: 'https://image.tmdb.org/t/p/w342' + this.props.item.poster_path }} />
//                         <Card.Content>
//                             <Title>{this.props.item.title}</Title>
//                             <Paragraph>{this.props.item.overview}</Paragraph>
//                         </Card.Content>
//                     {/* </TouchableOpacity> */}
//                 </Card>
//             </View>
//         );
//     }
// }

// Not class component practice
const Movie = ({item}) => (
    <View style={styles.card}>
        <Card elevation={30}>
                <Card.Cover style={{ height: 300 }} source={{ uri: 'https://image.tmdb.org/t/p/w342' + item.poster_path }} />
                <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph>{item.overview}</Paragraph>
                </Card.Content>
        </Card>
    </View>
)
export default Movie;
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Dialog, Portal } from 'react-native-paper';
import styles from './styles.js'
import PropTypes from 'prop-types';
import Details from './details.js'

export default class Movie extends Component {
    constructor(props, context) {
        super(props), context;
        this.state = {
        };
        this._onForward = this._onForward.bind(this);
    }
    static propTypes = {
        route: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
        navigator: PropTypes.object.isRequired,
    };

    _onForward() {
        this.props.navigator.push({
            component: Details,
            // title: 'Scene ' + nextIndex,
            passProps: { index: this.props.item },
        });
    }
    render() {
        return (
            <View style={styles.card}>
                <Card elevation={30}>
                    {/* <TouchableOpacity onPress={this._onForward}> */}
                        <Card.Cover style={{ height: 300 }} source={{ uri: 'https://image.tmdb.org/t/p/w342' + this.props.item.poster_path }} />
                        <Card.Content>
                            <Title>{this.props.item.title}</Title>
                            <Paragraph>{this.props.item.overview}</Paragraph>
                        </Card.Content>
                    {/* </TouchableOpacity> */}
                </Card>
            </View>
        );
    }
}

// Not class component practice
// const Movie = ({item}) => (
//     <View style={styles.card}>
//         <Card elevation={30}>
//             <TouchableOpacity>
//                 <Card.Cover style={{ height: 300 }} source={{ uri: 'https://image.tmdb.org/t/p/w342' + item.poster_path }} />
//                 <Card.Content>
//                     <Title>{item.title}</Title>
//                     <Paragraph>{item.overview}</Paragraph>
//                 </Card.Content>
//             </TouchableOpacity>
//         </Card>
//     </View>
// )
// export default Movie;
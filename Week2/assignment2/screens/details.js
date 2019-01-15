import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', 'Fail to load');
        return (
            <ScrollView style={{flex:1}}>
                <Card>
                    <Card.Cover style={{ height: 500 }} source={{ uri: 'https://image.tmdb.org/t/p/w342' + item.poster_path }} />
                    <Card.Content>
                        <Title>{item.title}</Title>
                        <Text>Vote: {item.vote_average}</Text>
                        <Text>Popularity: {item.popularity}</Text>
                        <Text>Release date: {item.release_date}</Text>
                        <Text>Overview:</Text>
                        <Text>{item.overview}</Text>
                    </Card.Content>
                </Card>
            </ScrollView>
        );
    }
}

// const DetailsScreen = ({ item }) => (
//     <View style={styles.card}>
//         <Card>
//             <Card.Cover style={{ height: 500 }} source={{ uri: 'https://image.tmdb.org/t/p/w342' + item.poster_path }} />
//             <Card.Content>
//                 <Title>{item.tilte}</Title>
//                 <Text h4>Vote: {item.vote_average}</Text>
//                 <Text h4>Popularity: {item.popularity}</Text>
//                 <Text h4>Release date: {item.overview}</Text>
//                 <Text h4>Overview:</Text>
//                 <Paragraph>{item.overview}</Paragraph>
//             </Card.Content>
//         </Card>
//     </View>
// )
// export default DetailsScreen;


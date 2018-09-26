import React, {Component} from 'react';
import {
    View, 
    Image,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class AluraLingua extends Component {
    render() {
        return(
            <View>
                <Image source={require('../../resources/img/aluraLingua.png')} />
                <TouchableOpacity title='Aprenda Inglês'>
                    <Text>Aprenda Inglês</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
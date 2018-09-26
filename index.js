/** @format */

import {Navigation} from 'react-native-navigation';
import {AsyncStorage} from 'react-native';
import Feed from './src/components/Feed';
import Login from './src/screen/Login';
import AluraLingua from './src/screen/AluraLingua';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);
Navigation.registerComponent('AluraLingua', () => AluraLingua);

AsyncStorage.getItem('token')
    .then(token => {
        if(token) {
            return {
                screen: 'Feed',
                title: 'Instalura'
            }
        }

        return {
            screen: 'Login',
            title: 'Login',
        }
    })
    .then(screen => Navigation.startSingleScreenApp({screen}));
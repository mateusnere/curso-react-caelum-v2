/** @format */

import {Navigation} from 'react-native-navigation';
import Feed from './src/components/Feed';
import Login from './src/screen/Login';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'Login',
        title: 'Login',
    }
});

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Login from './screens/login'
import Home from './screens/home'
import PostChit from './screens/postChit'
import Followers from './screens/followers'
import Followings from './screens/followings'
import { Header } from 'react-native/Libraries/NewAppScreen';


const navigation = createStackNavigator({
    login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    home: {
        screen: Home
    },
    postChit: {
        screen: PostChit
    },
    followers: {
        screen: Followers
    },
    followings: {
        screen: Followings
    }

}, {
    initialRoute: "login",
})

export default createAppContainer(navigation);

import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors} from '../themes/color';
import {TabbarIcon} from '../components/molecules';
import {images} from '../themes/images';
import Favorit from '../screens/favorit';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const options = {
  indicatorStyle: {
    height: widthPercentageToDP(0),
    opacity: 0,
  },
  style: {
    backgroundColor: colors.backgroundColor,
  },
  tabStyle: {
    width: widthPercentageToDP(100 / 4),
    height: heightPercentageToDP(7),
  },
  pressColor: colors.primary + 30,
  showIcon: true,
  showLabel: false,
};

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={options}
      backBehavior="initialRoute">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabbarIcon
              routeName="Home"
              focused={focused}
              iconActive={images.tab.home}
              iconNonActive={images.tab.homeOff}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorit"
        component={Favorit}
        options={{
          tabBarIcon: ({focused}) => (
            <TabbarIcon
              routeName="Favorit"
              focused={focused}
              iconActive={images.tab.favorit}
              iconNonActive={images.tab.favoritOff}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const Router = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         // name="Home"
//         // component={Home}
//         // options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

export default MainApp;

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
import Login from '../screens/auth';
import Order from '../screens/main/Order';
import History from '../screens/main/History';

const Stack = createStackNavigator();
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
              routeName="Profile"
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

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

import React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {routes} from './routes';
import SplashScreen from '../screens/auth/splash';
import FavoritesScreen from '../screens/favorites';
import HomeScreen from '../screens/home';
import MyMusicScreen from '../screens/myMusic';
import SearchScreen from '../screens/search';
import ProfileScreen from '../screens/profile';
import CustomTabBar from './customtabbar';
import MiniPlayer from '../player/miniplayer';
import colors from '../utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    background: colors.dark_blue,
  },
} as Theme;
const TabNavigator = () => (
  <Tab.Navigator
    backBehavior="none"
    screenOptions={{
      headerShown: false,
      lazy: true,
      tabBarHideOnKeyboard: true,
    }}
    tabBar={props => <CustomTabBar {...props} />}>
    <Tab.Screen key="HomeScreenTab" name={routes.Home} component={HomeScreen} />
    <Tab.Screen
      key="SearchScreenTab"
      name={routes.Search}
      component={SearchScreen}
    />
    <Tab.Screen
      key="FavoritesScreenTab"
      name={routes.Favorites}
      component={FavoritesScreen}
    />
    <Tab.Screen
      key="MyMusicScreenTab"
      name={routes.MyMusic}
      component={MyMusicScreen}
    />
    <Tab.Screen
      key="ProfileScreenTab"
      name={routes.Profile}
      component={ProfileScreen}
    />
  </Tab.Navigator>
);

const AppContainer = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={routes.Splash}>
        <Stack.Screen name={routes.Splash} component={SplashScreen} />
        <Stack.Screen name={routes.Dashboard} component={TabNavigator} />
      </Stack.Navigator>
      <MiniPlayer />
    </NavigationContainer>
  );
};

export default AppContainer;

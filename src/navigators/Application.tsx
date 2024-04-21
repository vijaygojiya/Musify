import React, {useEffect} from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {PermissionEnable, SettingsScreen, SplashScreen} from '../screens';

import {AppRoutes} from './routes';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import {Colors} from '../theme/Variables';
import {AppStackParamList} from '../Typings/navigation';
import {StatusBar} from 'react-native';
import {useAppTheme} from '../hooks';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {MiniPlayer} from '../components';
import {TRANSPARENT_COLOR} from '../utils/constant';

const Stack = createNativeStackNavigator<AppStackParamList>();

const getSplashScreen = () => SplashScreen;
const getTabNavigator = () => TabNavigator;
const getSettingsScreen = () => SettingsScreen;
const getPermissionEnable = () => PermissionEnable;

const AppTheme = {
  colors: {
    background: Colors.secondaryBg,
  },
} as Theme;

const ScreenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
} as NativeStackNavigationOptions;

const ApplicationNavigator = () => {
  const {isDarkMode, Colors: themeColors} = useAppTheme();

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(
      themeColors.bottomTabBg,
      'light',
      'navigation',
    );
  }, [themeColors.bottomTabBg]);

  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar
        // translucent={true}
        backgroundColor={themeColors.backgroundColor}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator
        screenOptions={ScreenOptions}
        initialRouteName={AppRoutes.Splash}>
        <Stack.Screen name={AppRoutes.Splash} getComponent={getSplashScreen} />
        <Stack.Screen
          name={AppRoutes.Dashboard}
          getComponent={getTabNavigator}
        />
        <Stack.Screen
          name={AppRoutes.Settings}
          getComponent={getSettingsScreen}
        />
        <Stack.Screen
          name={AppRoutes.PermissionEnable}
          getComponent={getPermissionEnable}
        />
      </Stack.Navigator>
      <MiniPlayer />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;

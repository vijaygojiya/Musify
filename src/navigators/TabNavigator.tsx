/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {TabRoutes} from './routes';
import {
  HomeScreen,
  SongsScreen,
  AlbumsScreen,
  ArtistsScreen,
  PlaylistsScreen,
} from '../screens';
import TabBar from './TabBar';
import {TabNavParamList} from '../Typings/navigation';
import {useNavigation} from '@react-navigation/native';
import {useActiveTrack} from 'react-native-track-player';
import {useAppTheme, useMiniPlayer} from '../hooks';
import {BOTTOM_TAB_BAR_HEIGHT, MINI_PLAYER_HEIGHT} from '../utils/constant';
import {withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPaddingBottom} from '../utils/helper';
import {Fonts} from '@/theme';
const Tab = createBottomTabNavigator<TabNavParamList>();

const renderCustomTab = (props: BottomTabBarProps) => {
  return <TabBar {...props} />;
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const track = useActiveTrack();
  const {translateY} = useMiniPlayer();
  const {Colors} = useAppTheme();
  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      if (track?.url) {
        translateY.value = withTiming(
          -(BOTTOM_TAB_BAR_HEIGHT + getPaddingBottom(insets.bottom)),
        );
      }
    });
    const unsubBlur = navigation.addListener('blur', () => {
      translateY.value = withTiming(track?.url ? 0 : MINI_PLAYER_HEIGHT);
    });
    return () => {
      unsubBlur();
      unsub();
    };
  }, [navigation, insets.bottom, track?.url]);

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        headerTitleStyle: [{color: Colors.titleText}, Fonts.textHeading],
        headerBackgroundContainerStyle: {
          backgroundColor: Colors.backgroundColor,
        },
        // headerShown: false,
        lazy: true,
      }}
      tabBar={renderCustomTab}>
      <Tab.Screen
        key="HomeScreenTab"
        name={TabRoutes.Home}
        component={HomeScreen}
      />
      <Tab.Screen
        key="SongsScreenTab"
        name={TabRoutes.Songs}
        component={SongsScreen}
      />
      <Tab.Screen
        key="AlbumsScreenTab"
        name={TabRoutes.Albums}
        component={AlbumsScreen}
      />
      <Tab.Screen
        key="ArtistsScreenTab"
        name={TabRoutes.Artists}
        component={ArtistsScreen}
      />
      <Tab.Screen
        key="PlaylistsScreenTab"
        name={TabRoutes.Playlists}
        component={PlaylistsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

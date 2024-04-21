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
import {useMiniPlayer} from '../hooks';
import {BOTTOM_TAB_BAR_HEIGHT, MINI_PLAYER_HEIGHT} from '../utils/constant';
import {withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPaddingBottom} from '../utils/helper';
const Tab = createBottomTabNavigator<TabNavParamList>();

const renderCustomTab = (props: BottomTabBarProps) => {
  return <TabBar {...props} />;
};

const getHomeScreen = () => HomeScreen;
const getSongsScreen = () => SongsScreen;
const getAlbumsScreen = () => AlbumsScreen;
const getArtistsScreen = () => ArtistsScreen;
const getPlaylistsScreen = () => PlaylistsScreen;

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const track = useActiveTrack();
  const {translateY} = useMiniPlayer();
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
        headerShown: false,
        lazy: true,
      }}
      tabBar={renderCustomTab}>
      <Tab.Screen
        key="HomeScreenTab"
        name={TabRoutes.Home}
        getComponent={getHomeScreen}
      />
      <Tab.Screen
        key="SongsScreenTab"
        name={TabRoutes.Songs}
        getComponent={getSongsScreen}
      />
      <Tab.Screen
        key="AlbumsScreenTab"
        name={TabRoutes.Albums}
        getComponent={getAlbumsScreen}
      />
      <Tab.Screen
        key="ArtistsScreenTab"
        name={TabRoutes.Artists}
        getComponent={getArtistsScreen}
      />
      <Tab.Screen
        key="PlaylistsScreenTab"
        name={TabRoutes.Playlists}
        getComponent={getPlaylistsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

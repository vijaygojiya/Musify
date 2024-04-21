import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppRoutes, TabRoutes} from '../navigators/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';

export type AppStackParamList = {
  [AppRoutes.Splash]: undefined;
  [AppRoutes.Dashboard]: undefined;
  [AppRoutes.Settings]: undefined;
  [AppRoutes.PermissionEnable]: undefined;
};

export type TabNavParamList = {
  [TabRoutes.Home]: undefined;
  [TabRoutes.Songs]: undefined;
  [TabRoutes.Albums]: undefined;
  [TabRoutes.Artists]: undefined;
  [TabRoutes.Playlists]: undefined;
};
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type MainTabScreenProps<RouteName extends keyof TabNavParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabNavParamList, RouteName>,
    NativeStackScreenProps<AppStackParamList>
  >;

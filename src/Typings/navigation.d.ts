import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppRoutes, TabRoutes} from '../navigators/routes';

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
export type SplashScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Splash'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Settings'
>;

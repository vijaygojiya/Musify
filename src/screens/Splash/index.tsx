import {Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Layout} from '../../theme';
import styles from './styles';
import {useAppTheme, useSetupPlayer} from '../../hooks';
import {AppRoutes} from '../../navigators/routes';
import {SplashScreenProps} from '../../Typings/navigation';
import {checkMediaPermission} from '../../utils/permission';

const SplashScreen = ({navigation}: SplashScreenProps) => {
  const {Colors} = useAppTheme();
  const isPlayerReady = useSetupPlayer();

  const checkAndRequestMediaPermission = useCallback(async () => {
    const isMediaPermissionGranted = await checkMediaPermission(true);
    if (isMediaPermissionGranted) {
      navigation.replace(AppRoutes.Dashboard);
    } else {
      navigation.replace(AppRoutes.PermissionEnable);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlayerReady) {
        checkAndRequestMediaPermission();
      }
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [navigation, isPlayerReady, checkAndRequestMediaPermission]);

  return (
    <View
      style={[
        Layout.fill,
        Layout.center,
        {backgroundColor: Colors.backgroundColor},
      ]}>
      <Text style={[styles.title, {color: Colors.titleText}]}>Musify</Text>
    </View>
  );
};

export default SplashScreen;

import {Alert, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {isAndroidVersionAboveS} from './helper';

const AUDIO_PERMISSION =
  Platform.OS === 'android'
    ? isAndroidVersionAboveS
      ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    : PERMISSIONS.IOS.MEDIA_LIBRARY;

export const checkMediaPermission = async (shouldRequestPermission = false) => {
  const result = await check(AUDIO_PERMISSION);
  switch (result) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.DENIED:
      if (shouldRequestPermission) {
        return await requestMediaPermission();
      } else {
        return false;
      }
    case RESULTS.BLOCKED:
    case RESULTS.UNAVAILABLE:
      throw Error('No more rerequestable!');
  }
};

const requestMediaPermission = async () => {
  const status = await request(AUDIO_PERMISSION);
  switch (status) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.DENIED:
    case RESULTS.BLOCKED:
      throw Error('No more rerequestable!');
  }
};

export const askForEnablePermissionManually = () => {
  Alert.alert(
    'Permission denied',
    'You must grant permission to access all features of our app',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Settings',
        onPress: openSettings,
      },
    ],
  );
};

import Images from '../assets/images';

type SettingsIcons = keyof typeof Images.Settings;

export interface SettingTypes {
  title: string;
  description: string;
  icon: SettingsIcons;
}

export const SETTINGS_LIST: SettingTypes[] = [
  {
    title: 'Profile',
    description: 'Customize your profile',
    icon: 'theme',
  },
  {
    title: 'App Theme',
    description: 'Change the theme',
    icon: 'theme',
  },
  {
    title: 'Notification',
    description: 'Customize the notification styles',
    icon: 'theme',
  },
  {
    title: 'About',
    description: 'Team & Contributors',
    icon: 'theme',
  },
];

export const BOTTOM_TAB_BAR_HEIGHT = 48;

export const MINI_PLAYER_HEIGHT = 68;
export const HEADER_BAR_HEIGHT = 66 + 18;

export const TRANSPARENT_COLOR = 'transparent';

import {Platform} from 'react-native';
export const getRandomColor = () => {
  // Generate random RGB color values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Return the color in the format '#RRGGBB'
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};

export const getPaddingBottom = (insetsBottom: number) =>
  Math.max(insetsBottom - Platform.select({ios: 4, default: 0}), 0);

export const isAndroidVersionAboveS =
  Platform.OS === 'android' && Platform.Version > 32;

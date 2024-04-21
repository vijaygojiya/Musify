const sharedColors = {
  barbie: '#ff9ff3',
  oak: '#1dd1a1',
  sky: '#48dbfb',
  fog: '#c8d6e5',
  aloes: '#00d2d3',
};

export const lightTheme = {
  Colors: {
    ...sharedColors,
    black: '#000',
    white: '#fff',
    sky: '#48dbfb',
    aloes: '#1dd1a1',
    backgroundColor: '#E4F0FA',
    headingText: '#041F1E',
    titleText: '#000000',
    secondaryText: '#6D81A1',
    inActiveTab: '#6D81A180',
    activeTab: '#041F1E',
    dark: '#041F1E',
    dark2: '#041F1E',
    dark100: '#6D81A1',
    grey: '#E4F0FA',
    grey50: '#E9F3FB',
    bottomTabBg: '#fff',
  },
  isDarkMode: false,
  // add any keys/functions/objects/arrays you want!
};

export const darkTheme = {
  Colors: {
    ...sharedColors,
    black: '#000',
    white: '#fff',
    sky: '#48dbfb',
    aloes: '#1dd1a1',
    backgroundColor: '#E4F0FA',
    headingText: '#041F1E',
    titleText: '#000000',
    secondaryText: '#6D81A1',
    inActiveTab: '#6D81A180',
    activeTab: '#041F1E',
    dark: '#041F1E',
    dark2: '#041F1E',
    dark100: '#6D81A1',
    grey: '#E4F0FA',
    grey50: '#E9F3FB',
    bottomTabBg: '#fff',
  },
  isDarkMode: true,
  // add any keys/functions/objects/arrays you want!
};

export type AppTheme = typeof lightTheme | typeof darkTheme;

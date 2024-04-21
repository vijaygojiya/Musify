import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {AppTheme, darkTheme, lightTheme} from '../theme';
import {TypeOfAppTheme} from '../utils/enum';
import {MMKVStorage} from '../services/MMKVStorage';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

type ThemeType = `${Theme}` | null | undefined;
type AppThemeType = `${TypeOfAppTheme}`;

interface ContextProps {
  appTheme: AppTheme;
  changeAppTheme: (selectedTheme: AppThemeType) => void;
}

const APP_THEME = 'APP_THEME';

export const AppThemeContext = createContext<ContextProps | null>(null);
const {getItem, setItem} = MMKVStorage;

export function AppThemeProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme);

  const initializeTheme = useCallback(async () => {
    const localTheme = (await getItem(APP_THEME)) as ThemeType;
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  const appTheme = theme === Theme.Light ? lightTheme : darkTheme;

  const changeAppTheme = useCallback(
    (selectedTheme: AppThemeType) => {
      let newTheme: ThemeType;
      if (selectedTheme === TypeOfAppTheme.DeviceTheme) {
        newTheme = colorScheme;
      } else {
        newTheme = selectedTheme;
      }
      if (newTheme) {
        setItem(APP_THEME, newTheme);
        setTheme(newTheme);
      }
    },
    [colorScheme],
  );

  const values = useMemo(() => {
    return {appTheme, changeAppTheme};
  }, [appTheme, changeAppTheme]);

  return (
    <AppThemeContext.Provider value={values}>
      {children}
    </AppThemeContext.Provider>
  );
}

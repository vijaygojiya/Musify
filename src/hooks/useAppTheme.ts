import {useContext} from 'react';
import {AppThemeContext} from '../contexts/appThemeProvider';

export default function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a AppThemeProvider');
  }

  const {appTheme, ...restContexts} = context;

  return {...appTheme, ...restContexts};
}

import React from 'react';
import {AppThemeProvider} from './src/contexts/appThemeProvider';
import ApplicationNavigator from './src/navigators/Application';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Layout} from './src/theme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {MiniPlayerProvider} from './src/contexts/miniPlayerProvider';
import {PortalProvider} from '@gorhom/portal';

const App = () => {
  return (
    <AppThemeProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={Layout.fill}>
          <PortalProvider>
            <BottomSheetModalProvider>
              <MiniPlayerProvider>
                <ApplicationNavigator />
              </MiniPlayerProvider>
            </BottomSheetModalProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AppThemeProvider>
  );
};

export default App;

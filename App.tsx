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
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {clientPersister} from '@/services/reactQuery';
import {QueryClient} from '@tanstack/react-query';
import {GlobalProvider} from '@/contexts/globalProvider';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});
const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: clientPersister}}>
      <AppThemeProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView style={Layout.fill}>
            <PortalProvider>
              <GlobalProvider>
                <BottomSheetModalProvider>
                  <MiniPlayerProvider>
                    <ApplicationNavigator />
                  </MiniPlayerProvider>
                </BottomSheetModalProvider>
              </GlobalProvider>
            </PortalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AppThemeProvider>
    </PersistQueryClientProvider>
  );
};

export default App;

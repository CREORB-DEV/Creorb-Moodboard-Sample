import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from 'navigation/AppNavigator';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
    </>
  );
}

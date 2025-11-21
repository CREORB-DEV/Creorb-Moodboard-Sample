import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from 'navigation/AppNavigator';
import { MoodProvider } from 'context/MoodContext';

export default function App() {
  return (
    <>
    <MoodProvider>
      <SafeAreaProvider>
      <AppNavigator />
        <Toast />
    </SafeAreaProvider>
    </MoodProvider>
    </>
  );
}

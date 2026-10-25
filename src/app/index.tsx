
import {SafeAreaProvider, } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import AppNavigator from '../navigation/AppNavigator';

export default function App(){
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

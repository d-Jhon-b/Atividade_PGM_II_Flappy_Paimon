import React, { useState } from 'react';
import { View } from 'react-native';
import {
  createNavigationContainerRef,
  DarkTheme,
  NavigationContainer, NavigationIndependentTree
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuMusic from '../components/MenuMusic';
import { colors } from '../theme/theme';
import Tela1 from '../screens/tela1';
import Tela2 from '../screens/tela2';
import Tela3 from '../screens/tela3';
import Tela4 from '../screens/tela4';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.navy },
};

export default function AppNavigator() {
  const [route, setRoute] = useState<string | undefined>();
  const [unlock, setUnlock] = useState(0);

  const syncRoute = () => setRoute(navigationRef.getCurrentRoute()?.name);

  return (
    <NavigationIndependentTree>

    <View
      style={{ flex: 1 }}
      // observa os toques sem interceptá-los
      onStartShouldSetResponderCapture={() => {
        setUnlock((n) => n + 1);
        return false;
      }}
    >
      <NavigationContainer
        ref={navigationRef}
        theme={navTheme}
        onReady={syncRoute}
        onStateChange={syncRoute}
      >
        <Stack.Navigator
          initialRouteName="Tela1"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: colors.navy },
          }}
        >
          <Stack.Screen name="Tela1" component={Tela1} />
          <Stack.Screen name="Tela2" component={Tela2} />
          <Stack.Screen name="Tela3" component={Tela3} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Tela4" component={Tela4} />
        </Stack.Navigator>
      </NavigationContainer>

      <MenuMusic playing={route !== undefined && route !== 'Tela3'} unlock={unlock} />
    </View>
  </NavigationIndependentTree>

  );
}
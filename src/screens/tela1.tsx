import React, { useEffect, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import PixelButton from '../components/game/PixelButton';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Tela1'>;

const PAIMON = require('../assets/paimon/paimon_fly1.png');
// \src\assets\paimon\paimon_fly1.png
/** Tela 1 — Boas-vindas */
export default function Tela1({ navigation }: Props) {
  const [float] = useState(() => new Animated.Value(0));

  // Paimon flutuando para cima e para baixo
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [float]);

  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -16] });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>BEM-VINDO(A) AO</Text>
        <Text style={styles.title}>PAIMON</Text>
        <Text style={[styles.title, styles.titleGold]}>FLAP</Text>
      </View>

      <Animated.View style={{ transform: [{ translateY }] }}>
        <Image source={PAIMON} style={styles.paimon} resizeMode="contain" />
      </Animated.View>

      <View style={styles.buttons}>
        <PixelButton label="JOGAR" onPress={() => navigation.navigate('Tela3')} />
        <PixelButton
          label="COMO JOGAR"
          variant="secondary"
          onPress={() => navigation.navigate('Tela2')}
        />
        <PixelButton
          label="CRÉDITOS"
          variant="secondary"
          onPress={() => navigation.navigate('Tela4')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  header: { alignItems: 'center' },
  subtitle: { fontFamily: fonts.pixel, color: colors.ice, fontSize: 14, letterSpacing: 3 },
  title: {
    fontFamily: fonts.pixel,
    color: colors.white,
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 4,
    textShadowColor: colors.navyBorder,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
  titleGold: { color: colors.gold, marginTop: -8 },
  paimon: { width: 200, height: 200 },
  buttons: { gap: 14, alignItems: 'center' },
});

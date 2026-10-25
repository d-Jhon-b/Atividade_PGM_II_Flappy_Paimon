import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import PixelButton from '../components/game/PixelButton';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Tela2'>;

const FLY = require('../assets/paimon/paimon_fly2.png');
const DEAD = require('../assets/paimon/paimon_dead.png');
// src\assets\paimon\paimon_fly2.png
const STEPS = [
  { n: '1', text: 'Toque na tela para a Paimon bater as asas e subir.' },
  { n: '2', text: 'Sem tocar, ela cai por causa da gravidade.' },
  { n: '3', text: 'Passe pela abertura entre os pilares: cada par vale 1 ponto.' },
  { n: '4', text: 'Bateu em um pilar ou caiu no chão? Fim de jogo!' },
];

/** Tela 2 — Instruções do jogo */
export default function Tela2({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>COMO JOGAR</Text>

        <View style={styles.sprites}>
          <View style={styles.spriteBox}>
            <Image source={FLY} style={styles.sprite} resizeMode="contain" />
            <Text style={styles.caption}>VOANDO</Text>
          </View>
          <View style={styles.spriteBox}>
            <Image source={DEAD} style={styles.sprite} resizeMode="contain" />
            <Text style={styles.caption}>GAME OVER</Text>
          </View>
        </View>

        <View style={styles.card}>
          {STEPS.map((s) => (
            <View key={s.n} style={styles.stepRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{s.n}</Text>
              </View>
              <Text style={styles.stepText}>{s.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttons}>
          <PixelButton label="JOGAR" onPress={() => navigation.navigate('Tela3')} />
          <PixelButton label="VOLTAR" variant="secondary" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  content: { alignItems: 'center', padding: 20, gap: 20 },
  title: {
    fontFamily: fonts.pixel,
    fontSize: 34,
    fontWeight: '900',
    color: colors.gold,
    letterSpacing: 3,
    textShadowColor: colors.navyBorder,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
  },
  sprites: { flexDirection: 'row', gap: 24 },
  spriteBox: { alignItems: 'center' },
  sprite: { width: 110, height: 110 },
  caption: { fontFamily: fonts.pixel, color: colors.ice, fontSize: 12, letterSpacing: 2 },
  card: {
    width: '100%',
    backgroundColor: colors.navyLight,
    borderColor: colors.navyBorder,
    borderWidth: 3,
    borderRadius: 8,
    padding: 16,
    gap: 14,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: fonts.pixel, fontWeight: '900', color: colors.navy, fontSize: 16 },
  stepText: { flex: 1, color: colors.white, fontSize: 16, lineHeight: 22 },
  buttons: { gap: 14, alignItems: 'center', marginTop: 4 },
});

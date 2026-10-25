import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Bird from '../components/game/Bird';
import PillarPair from '../components/game/PillarPair';
import PixelButton from '../components/game/PixelButton';
import { useFlappyGame } from '../game/useFlappyGame';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/theme';
import Background from '../components/Background';

import { useThemeMusic } from '../game/useThemeMusic';


type Props = NativeStackScreenProps<RootStackParamList, 'Tela3'>;

/** Tela 3 — O jogo */
export default function Tela3({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { snapshot, bestScore, flap, restart } = useFlappyGame(width, height);
  useThemeMusic(snapshot.status, snapshot.score);  
  
  const isReady = snapshot.status === 'ready';
  const isOver = snapshot.status === 'gameover';

  return (
    <View style={styles.container}>
      {/* Área de jogo: qualquer toque faz a Paimon bater as asas */}
      <Background score={snapshot.score} />
      <Pressable style={StyleSheet.absoluteFill} onPressIn={flap}>
        {snapshot.pillars.map((p) => (
          <PillarPair key={p.id} x={p.x} gapTop={p.gapTop} screenHeight={height} />
        ))}
        <Bird
          x={snapshot.birdX}
          y={snapshot.birdY}
          rotation={snapshot.rotation}
          frame={snapshot.frame}
        />
      </Pressable>

      {/* HUD */}
      <View pointerEvents="none" style={[styles.hud, { top: insets.top + 12 }]}>
        <Text style={styles.score}>{snapshot.score}</Text>
      </View>

      <Pressable
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { top: insets.top + 12 }]}
        hitSlop={10}
      >
        <Text style={styles.backText}>◀ MENU</Text>
      </Pressable>

      {isReady && (
        <View pointerEvents="none" style={styles.readyBox}>
          <Text style={styles.readyText}>TOQUE PARA VOAR</Text>
        </View>
      )}

      {/* Fim de jogo */}
      {isOver && (
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Text style={styles.gameOver}>GAME OVER</Text>

            <View style={styles.scoreRow}>
              <View style={styles.scoreCol}>
                <Text style={styles.scoreLabel}>PONTOS</Text>
                <Text style={styles.scoreValue}>{snapshot.score}</Text>
              </View>
              <View style={styles.scoreCol}>
                <Text style={styles.scoreLabel}>RECORDE</Text>
                <Text style={styles.scoreValue}>{bestScore}</Text>
              </View>
            </View>

            <PixelButton label="NOVO JOGO" onPress={restart} />
            <PixelButton label="MENU" variant="secondary" onPress={() => navigation.goBack()} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, overflow: 'hidden' },
  hud: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  score: {
    fontFamily: fonts.pixel,
    fontSize: 64,
    fontWeight: '900',
    color: colors.white,
    textShadowColor: colors.navyBorder,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.navyLight,
    borderColor: colors.navyBorder,
    borderWidth: 2,
    borderRadius: 4,
  },
  backText: { fontFamily: fonts.pixel, color: colors.ice, fontSize: 12, fontWeight: '900' },
  readyBox: { position: 'absolute', left: 0, right: 0, top: '62%', alignItems: 'center' },
  readyText: {
    fontFamily: fonts.pixel,
    color: colors.gold,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '82%',
    maxWidth: 360,
    backgroundColor: colors.navy,
    borderColor: colors.gold,
    borderWidth: 4,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    gap: 14,
  },
  gameOver: {
    fontFamily: fonts.pixel,
    fontSize: 32,
    fontWeight: '900',
    color: colors.danger,
    letterSpacing: 2,
  },
  scoreRow: { flexDirection: 'row', gap: 40, marginBottom: 6 },
  scoreCol: { alignItems: 'center' },
  scoreLabel: { fontFamily: fonts.pixel, color: colors.ice, fontSize: 12, letterSpacing: 2 },
  scoreValue: { fontFamily: fonts.pixel, color: colors.white, fontSize: 40, fontWeight: '900' },
});

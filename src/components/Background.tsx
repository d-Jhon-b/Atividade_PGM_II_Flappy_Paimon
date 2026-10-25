import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';

import { getStageIndex, STAGES } from '../game/stages';

const FADE_MS = 1500;

/** Mostra o cenário da fase atual e faz fade ao mudar de fase. */
export default function Background({ score }: { score: number }) {
  const { width, height } = useWindowDimensions();
  const size = { width, height }; // mesmo tamanho da área de jogo

  const stage = getStageIndex(score);
  const [base, setBase] = useState(stage); // camada de baixo
  const [top, setTop] = useState(stage); // camada de cima (a que faz fade)
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (stage === top) return;

    if (stage < top) {
      // voltou para o início (novo jogo): troca na hora
      setBase(stage);
      setTop(stage);
      opacity.setValue(1);
      return;
    }

    // avançou de fase: novo cenário aparece em fade por cima
    setTop(stage);
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: FADE_MS,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setBase(stage);
    });
  }, [stage, top, opacity]);

  return (
    <View style={[styles.layer, size]} pointerEvents="none">
      <Image source={STAGES[base].image} style={size} contentFit="cover" />
      <Animated.View style={[styles.layer, size, { opacity }]}>
        <Image source={STAGES[top].image} style={size} contentFit="cover" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { position: 'absolute', top: 0, left: 0 },
});

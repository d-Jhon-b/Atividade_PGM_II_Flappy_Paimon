import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { BIRD_HITBOX, BIRD_SIZE, SHOW_HITBOX } from '../../game/constants';
import type { BirdFrame } from '../../game/types';

// 0, 1, 2 = animação de voo | 3 = game over
export const PAIMON_FRAMES = [
  require('../../assets/paimon/paimon_fly1.png'),
  require('../../assets/paimon/paimon_fly2.png'),
  require('../../assets/paimon/paimon_fly3.png'),
  require('../../assets/paimon/paimon_dead.png'),
];

interface Props {
  x: number; // centro horizontal
  y: number; // centro vertical
  rotation: number; // graus
  frame: BirdFrame;
}

export default function Bird({ x, y, rotation, frame }: Props) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.bird,
        {
          transform: [
            { translateX: x - BIRD_SIZE / 2 },
            { translateY: y - BIRD_SIZE / 2 },
            { rotate: `${rotation}deg` },
          ],
        },
      ]}
    >
      <Image source={PAIMON_FRAMES[frame]} style={styles.sprite} resizeMode="contain" />
      {SHOW_HITBOX && <View style={styles.hitbox} />}
    </View>
  );
}

const styles = StyleSheet.create({
  bird: { position: 'absolute', left: 0, top: 0, width: BIRD_SIZE, height: BIRD_SIZE },
  sprite: { width: BIRD_SIZE, height: BIRD_SIZE },
  hitbox: {
    position: 'absolute',
    left: (BIRD_SIZE - BIRD_HITBOX) / 2,
    top: (BIRD_SIZE - BIRD_HITBOX) / 2,
    width: BIRD_HITBOX,
    height: BIRD_HITBOX,
    borderWidth: 2,
    borderColor: 'red',
  },
});

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import {
  GAP_SIZE,
  PILLAR_BOTTOM_IMG_HEIGHT,
  PILLAR_IMG_WIDTH,
  PILLAR_TOP_IMG_HEIGHT,
  PILLAR_WIDTH,
} from '../../game/constants';

const TOP_IMG = require('../../assets/pillars/pillar_top.png');
const BOTTOM_IMG = require('../../assets/pillars/pillar_bottom.png');

// As imagens são altas o bastante para chegar até a borda da tela em qualquer aparelho.
const SCALE = PILLAR_WIDTH / PILLAR_IMG_WIDTH;
const TOP_HEIGHT = PILLAR_TOP_IMG_HEIGHT * SCALE;
const BOTTOM_HEIGHT = PILLAR_BOTTOM_IMG_HEIGHT * SCALE;

interface Props {
  x: number; // borda esquerda
  gapTop: number; // onde a abertura começa
  screenHeight: number;
}

/** Um par de pilares: um pendurado no topo, outro subindo do chão. */
export default function PillarPair({ x, gapTop, screenHeight }: Props) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.pair,
        { height: screenHeight, transform: [{ translateX: x }] },
      ]}
    >
      <Image
        source={TOP_IMG}
        style={{
          position: 'absolute',
          width: PILLAR_WIDTH,
          height: TOP_HEIGHT,
          top: gapTop - TOP_HEIGHT,
        }}
        resizeMode="stretch"
      />
      <Image
        source={BOTTOM_IMG}
        style={{
          position: 'absolute',
          width: PILLAR_WIDTH,
          height: BOTTOM_HEIGHT,
          top: gapTop + GAP_SIZE,
        }}
        resizeMode="stretch"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pair: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: PILLAR_WIDTH,
    overflow: 'hidden',
  },
});

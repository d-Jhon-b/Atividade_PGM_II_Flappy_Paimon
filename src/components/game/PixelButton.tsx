import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, fonts } from '../../theme/theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

/** Botão "chunky" com borda grossa embaixo, combinando com a pixel art. */
export default function PixelButton({ label, onPress, variant = 'primary', style }: Props) {
  const primary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, primary ? styles.labelPrimary : styles.labelSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 220,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderBottomWidth: 7,
    borderRadius: 6,
  },
  primary: { backgroundColor: colors.gold, borderColor: colors.goldDark },
  secondary: { backgroundColor: colors.navyLight, borderColor: colors.navyBorder },
  pressed: { transform: [{ translateY: 4 }], borderBottomWidth: 3 },
  label: { fontFamily: fonts.pixel, fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  labelPrimary: { color: colors.navy },
  labelSecondary: { color: colors.ice },
});

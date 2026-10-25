import { Platform } from 'react-native';

// Identidade visual: azul-noite + dourado (paleta da Paimon e dos pilares).
export const colors = {
  navy: '#0B1B3A',
  navyLight: '#16305F',
  navyBorder: '#07112A',
  gold: '#F5C451',
  goldDark: '#B8862B',
  ice: '#BFD9FF',
  white: '#FFFFFF',
  danger: '#E5586B',
} as const;

export const fonts = {
  pixel: Platform.select({
    ios: 'Courier-Bold',
    android: 'monospace',
    default: 'monospace',
  }) as string,
};

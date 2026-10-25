import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import PixelButton from '../components/game/PixelButton';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Tela4'>;

const STUDENT_NAME = 'Jhon Deyvid Quispe Mamani';

const INFO = [
  { label: 'DESENVOLVIDO POR', value: STUDENT_NAME },
  { label: 'INSTITUIÇÃO', value: 'FATEC' },
  { label: 'CURSO', value: 'Desenvolvimento de Software Multiplataforma' },
  { label: 'DISCIPLINA', value: 'Programação para Dispositivos Móveis II' },
  { label: 'PROFESSOR', value: 'Jeferson de Souza Dias' },
  { label: 'ARTE', value: 'Pixel art criada pelo aluno. Personagem Paimon © HoYoverse (fan art, uso acadêmico).' },
];

/** Tela 4 — Créditos */
export default function Tela4({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>CRÉDITOS</Text>

        <View style={styles.card}>
          {INFO.map((item) => (
            <View key={item.label} style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Este site é um projeto acadêmico da FATEC, criado apenas para fins de estudo. Não utilize
            as informações aqui para uso real.
          </Text>
        </View>

        <PixelButton label="VOLTAR AO INÍCIO" onPress={() => navigation.navigate('Tela1')} />
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
  card: {
    width: '100%',
    backgroundColor: colors.navyLight,
    borderColor: colors.navyBorder,
    borderWidth: 3,
    borderRadius: 8,
    padding: 16,
    gap: 14,
  },
  row: { gap: 2 },
  label: { fontFamily: fonts.pixel, color: colors.gold, fontSize: 12, letterSpacing: 2 },
  value: { color: colors.white, fontSize: 16, lineHeight: 22 },
  notice: {
    width: '100%',
    borderColor: colors.gold,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 14,
  },
  noticeText: { color: colors.ice, fontSize: 14, lineHeight: 20, textAlign: 'center' },
});

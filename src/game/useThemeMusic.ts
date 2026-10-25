import { useEffect, useRef } from 'react';
import { useAudioPlayer } from 'expo-audio';

import { getStageIndex, STAGES } from './stages'; // ajuste o caminho para onde está seu stages.ts
import type { GameStatus } from './types';

/** Música tema em loop, trocando de faixa a cada fase. */
export function useThemeMusic(status: GameStatus, score: number) {
  const stage = getStageIndex(score);
  const player = useAudioPlayer(STAGES[0].music);
  const loaded = useRef(0); // índice da faixa carregada no player

  useEffect(() => {
    player.volume = 0.5;
    player.loop = true;
  }, [player]);

  useEffect(() => {
    // encerra a faixa atual e carrega a da fase pedida (se for outra)
    const load = (index: number) => {
      if (loaded.current === index) return false;
      player.pause();
      player.replace(STAGES[index].music);
      loaded.current = index;
      return true;
    };

    // aguardando o primeiro toque: faixa da 1ª fase, parada no início
    if (status === 'ready') {
      load(0);
      player.loop = true;
      player.pause();
      player.seekTo(0);
      return;
    }

    // bateu: para a música
    if (status === 'gameover') {
      player.pause();
      return;
    }

    // jogando: toca a faixa da fase atual, repetindo quando acabar
    const changed = load(stage);
    player.loop = true;
    if (changed) player.seekTo(0); // faixa nova começa do início
    player.play();
  }, [status, stage, player]);
}
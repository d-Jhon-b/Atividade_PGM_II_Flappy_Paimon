import { useEffect } from 'react';
import { useAudioPlayer } from 'expo-audio';

const MENU_THEME = require('../assets/audio/menuPrincipal.mp3');

interface Props {
  playing: boolean; 
  unlock: number; 
}

/** Música do menu: não desenha nada, só controla o áudio. */
export default function MenuMusic({ playing, unlock }: Props) {
  const player = useAudioPlayer(MENU_THEME);

  useEffect(() => {
    player.loop = true;
    player.volume = 0.5;
  }, [player]);

  useEffect(() => {
    if (playing) player.play();
    else player.pause();
  }, [playing, unlock, player]);

  return null;
}
export type GameStatus = 'ready' | 'playing' | 'gameover';

/** 0, 1, 2 = voando | 3 = derrotada */
export type BirdFrame = 0 | 1 | 2 | 3;

export interface PillarState {
  id: number;
  x: number; // borda esquerda
  gapTop: number; // y onde a abertura começa
  passed: boolean;
}

/** Estado "vivo" do jogo — é mutado a cada frame (fora do React). */
export interface World {
  status: GameStatus;
  width: number;
  height: number;
  birdY: number; // centro vertical
  birdVy: number;
  rotation: number; // graus
  pillars: PillarState[];
  score: number;
  nextPillarId: number;
  elapsed: number; // segundos desde a criação (anima asas e "flutuação")
}

/** Cópia imutável do mundo, usada apenas para desenhar. */
export interface GameSnapshot {
  status: GameStatus;
  birdX: number;
  birdY: number;
  rotation: number;
  frame: BirdFrame;
  pillars: PillarState[];
  score: number;
}

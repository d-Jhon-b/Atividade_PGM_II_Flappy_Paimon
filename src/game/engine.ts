import {
  BIRD_HITBOX,
  BIRD_SIZE,
  BIRD_X_RATIO,
  GAP_MARGIN_BOTTOM,
  GAP_MARGIN_TOP,
  GAP_SIZE,
  GRAVITY,
  JUMP_VELOCITY,
  MAX_FALL_SPEED,
  MAX_GAP_SHIFT,
  PILLAR_HIT_INSET,
  PILLAR_SPACING,
  PILLAR_SPEED,
  PILLAR_WIDTH,
} from './constants';
import type { BirdFrame, GameSnapshot, World } from './types';

const FLY_SEQUENCE: BirdFrame[] = [0, 1, 2, 1];

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export const getBirdX = (width: number) => width * BIRD_X_RATIO;

export function createWorld(width: number, height: number): World {
  return {
    status: 'ready',
    width,
    height,
    birdY: height * 0.45,
    birdVy: 0,
    rotation: 0,
    pillars: [],
    score: 0,
    nextPillarId: 0,
    elapsed: 0,
  };
}

/** Cria um pilar novo em `x`, com a abertura em altura aleatória (mas justa). */
function spawnPillar(w: World, x: number): void {
  const min = GAP_MARGIN_TOP;
  const max = Math.max(min + 1, w.height - GAP_SIZE - GAP_MARGIN_BOTTOM);
  const prev = w.pillars[w.pillars.length - 1];

  const gapTop = prev
    ? clamp(prev.gapTop + (Math.random() * 2 - 1) * MAX_GAP_SHIFT, min, max)
    : min + Math.random() * (max - min);

  w.pillars.push({ id: w.nextPillarId++, x, gapTop, passed: false });
}

/** Toque na tela: inicia a partida (se estiver pronta) e faz a Paimon bater as asas. */
export function flap(w: World): void {
  if (w.status === 'ready') w.status = 'playing';
  if (w.status === 'playing') w.birdVy = JUMP_VELOCITY;
}

function endGame(w: World): void {
  w.status = 'gameover';
  w.birdVy = -180; // pequeno "tranco" antes de cair
  w.rotation = 0;
}

/** Avança a simulação `dt` segundos. Muta o mundo (mais barato que copiar a cada frame). */
export function stepWorld(w: World, dt: number): void {
  w.elapsed += dt;

  // ---- Pronta: Paimon flutua parada esperando o primeiro toque ----
  if (w.status === 'ready') {
    w.birdY = w.height * 0.45 + Math.sin(w.elapsed * 4) * 10;
    w.rotation = 0;
    return;
  }

  // ---- Fim de jogo: ela cai até o chão ----
  if (w.status === 'gameover') {
    const floorY = w.height - BIRD_SIZE / 2;
    if (w.birdY < floorY) {
      w.birdVy = Math.min(w.birdVy + GRAVITY * dt, MAX_FALL_SPEED);
      w.birdY = Math.min(w.birdY + w.birdVy * dt, floorY);
    }
    return;
  }

  // ---- Jogando ----
  const half = BIRD_HITBOX / 2;
  const birdX = getBirdX(w.width);

  // gravidade + movimento
  w.birdVy = Math.min(w.birdVy + GRAVITY * dt, MAX_FALL_SPEED);
  w.birdY += w.birdVy * dt;
  w.rotation = clamp(w.birdVy * 0.09, -25, 70);

  // teto: só trava (como no original)
  if (w.birdY - half < 0) {
    w.birdY = half;
    w.birdVy = 0;
  }

  // move pilares
  for (const p of w.pillars) p.x -= PILLAR_SPEED * dt;

  // gera novos pilares logo fora da tela, sempre com o mesmo espaçamento
  const last = w.pillars[w.pillars.length - 1];
  if (!last) {
    spawnPillar(w, w.width + 80);
  } else if (last.x + PILLAR_SPACING < w.width + PILLAR_WIDTH) {
    spawnPillar(w, last.x + PILLAR_SPACING);
  }

  // descarta pilares que já saíram pela esquerda
  w.pillars = w.pillars.filter((p) => p.x + PILLAR_WIDTH > -20);

  // pontuação + colisão com pilares
  for (const p of w.pillars) {
    if (!p.passed && p.x + PILLAR_WIDTH < birdX - half) {
      p.passed = true;
      w.score += 1;
    }

    const overlapX =
      birdX + half > p.x + PILLAR_HIT_INSET && birdX - half < p.x + PILLAR_WIDTH - PILLAR_HIT_INSET;

    if (overlapX) {
      const hitTop = w.birdY - half < p.gapTop;
      const hitBottom = w.birdY + half > p.gapTop + GAP_SIZE;
      if (hitTop || hitBottom) {
        endGame(w);
        return;
      }
    }
  }

  // chão
  if (w.birdY + half >= w.height) {
    w.birdY = w.height - BIRD_SIZE / 2;
    endGame(w);
  }
}

function getBirdFrame(w: World): BirdFrame {
  if (w.status === 'gameover') return 3;
  const fps = w.status === 'playing' ? 12 : 6;
  return FLY_SEQUENCE[Math.floor(w.elapsed * fps) % FLY_SEQUENCE.length];
}

export function toSnapshot(w: World): GameSnapshot {
  return {
    status: w.status,
    birdX: getBirdX(w.width),
    birdY: w.birdY,
    rotation: w.rotation,
    frame: getBirdFrame(w),
    pillars: w.pillars.map((p) => ({ ...p })),
    score: w.score,
  };
}

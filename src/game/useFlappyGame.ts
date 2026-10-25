import { useCallback, useEffect, useRef, useState } from 'react';

import { MAX_DT } from './constants';
import { createWorld, flap as flapWorld, stepWorld, toSnapshot } from './engine';
import type { GameSnapshot, World } from './types';

/**
 * Hook do jogo: roda o loop (requestAnimationFrame) e entrega ao React
 * apenas um "snapshot" por frame. A lógica em si está em engine.ts.
 */
export function useFlappyGame(width: number, height: number) {
  const worldRef = useRef<World>(createWorld(width, height));
  const [snapshot, setSnapshot] = useState<GameSnapshot>(() =>
    toSnapshot(createWorld(width, height)),
  );
  const [bestScore, setBestScore] = useState(0);

  // se o tamanho da tela mudar, começa um mundo novo
  useEffect(() => {
    worldRef.current = createWorld(width, height);
  }, [width, height]);

  // loop principal
  useEffect(() => {
    let rafId = 0;
    let lastTime: number | null = null;

    const loop = (now: number) => {
      const dt = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, MAX_DT);
      lastTime = now;

      const world = worldRef.current;
      const before = world.status;
      stepWorld(world, dt);

      if (before === 'playing' && world.status === 'gameover') {
        const finalScore = world.score;
        setBestScore((best) => Math.max(best, finalScore));
      }

      setSnapshot(toSnapshot(world));
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /** Toque na tela. */
  const flap = useCallback(() => {
    flapWorld(worldRef.current);
  }, []);

  /** "Novo jogo": zera tudo e volta para o estado "pronto". */
  const restart = useCallback(() => {
    worldRef.current = createWorld(width, height);
  }, [width, height]);

  return { snapshot, bestScore, flap, restart };
}

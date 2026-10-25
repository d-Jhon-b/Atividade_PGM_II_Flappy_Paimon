export interface Stage {
  name: string;
  minScore: number; // pontuação em que este cenário começa
  image: number;
  music: number
}

// Em ordem crescente de minScore
export const STAGES: Stage[] = [
  { name: 'Mondstadt', minScore: 0, image: require('../assets/background/moonstand.jpg'),
    music:require('../assets/audio/moonstand.mp3') },
  { name: 'Liyue', minScore: 3, image: require('../assets/background/liyue.jpg'),
    music: require('../assets/audio/liyue.mp3')
   },
  { name: 'Inazuma', minScore: 6, image: require('../assets/background/inazuma.jpg'),
    music: require('../assets/audio/inazuma.mp3')
   },
  { name: 'Sumero', minScore: 9, image: require('../assets/background/sumero.jpg'),
    music: require('../assets/audio/sumero.mp3')
   },
  { name: 'fontaine', minScore: 12, image: require('../assets/background/fontaine.jpg'),
    music: require('../assets/audio/fontaine.mp3')
  },
  { name: 'Natlan', minScore: 15, image: require('../assets/background/natlan.jpg'),
    music: require('../assets/audio/natlan.mp3')
  },
  { name: 'Nod_krai', minScore: 18, image: require('../assets/background/nod_krai.jpg'),
    music: require('../assets/audio/nod_krai.mp3')
  },
  { name: 'Sneznaya', minScore: 21, image: require('../assets/background/sneznaya.jpg'),
    music: require('../assets/audio/sneznaya.mp3')
  },
];

export function getStageIndex(score: number): number {
  let index = 0;
  STAGES.forEach((s, i) => {
    if(score > 21) index = 0
    if (score >= s.minScore) index = i;
  });
  return index;
}
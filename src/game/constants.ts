// ===== Física (unidades: pixels e segundos) =====
export const GRAVITY = 1700; // px/s²
export const JUMP_VELOCITY = -520; // px/s (negativo = para cima)
export const MAX_FALL_SPEED = 850; // px/s
export const MAX_DT = 1 / 30; // evita "saltos" se o app travar um frame

// ===== Paimon =====
export const BIRD_SIZE = 72; // tamanho do sprite na tela
export const BIRD_HITBOX = 34; // área que realmente colide (menor que o sprite)
export const BIRD_X_RATIO = 0.28; // posição horizontal fixa (28% da largura)

// ===== Pilares =====
export const PILLAR_WIDTH = 78;
export const PILLAR_SPEED = 160; // px/s
export const PILLAR_SPACING = 350; // distância horizontal entre pilares
export const GAP_SIZE = 200; // abertura por onde a Paimon passa
export const GAP_MARGIN_TOP = 90; // menor altura permitida para o topo da abertura
export const GAP_MARGIN_BOTTOM = 110; // folga mínima até o chão
export const MAX_GAP_SHIFT = 200; // variação máxima entre uma abertura e a próxima
export const PILLAR_HIT_INSET = 7; // tolera as bordas dos capitéis (mais largos que o fuste)

// Imagens originais dos pilares (px) — usadas para manter a proporção
export const PILLAR_IMG_WIDTH = 114;
export const PILLAR_TOP_IMG_HEIGHT = 1001;
export const PILLAR_BOTTOM_IMG_HEIGHT = 1100;

// Mostra a caixa de colisão (útil para ajustar a dificuldade)
export const SHOW_HITBOX = false;

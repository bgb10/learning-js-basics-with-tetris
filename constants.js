export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    UP: 38,
    P: 80
}

export const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

export const SHAPES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
    ],
    [
        [2, 0, 0], 
        [2, 2, 2], 
        [0, 0, 0]
    ],
    [
        [0, 0, 3],
        [3, 3, 3], 
        [0, 0, 0]
    ],
    [
        [4, 4], 
        [4, 4]
    ],
    [
        [0, 5, 5], 
        [5, 5, 0], 
        [0, 0, 0]
    ],
    [
        [0, 6, 0], 
        [6, 6, 6], 
        [0, 0, 0]
    ],
    [
        [7, 7, 0], 
        [0, 7, 7], 
        [0, 0, 0]
    ]
];

export const POINTS_PER_LINE = {
    SINGLE: 50,
    DOUBLE: 150,
    TRIPLE: 300,
    TETRIS: 500
}

export const MULTIPLY_POINTS_BY_COMBO = [1, 1.05, 1.1, 1.12, 1.15, 1.18, 1.2, 1.23, 1.25, 1.27, 1.3, 1.5];

export const SCORE_UPPER_BOUND_BY_LEVEL = [0, 0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000];
export const DROP_PERIOD_BY_LEVEL = [0, 1000, 900, 700, 600, 500, 400, 300, 200, 100, 70];

export const ANIMATION_FRAME = 50;

Object.freeze(KEY);
Object.freeze(COLORS);
Object.freeze(SHAPES);
Object.freeze(POINTS_PER_LINE);
Object.freeze(MULTIPLY_POINTS_BY_COMBO);
Object.freeze(SCORE_UPPER_BOUND_BY_LEVEL);
Object.freeze(DROP_PERIOD_BY_LEVEL);
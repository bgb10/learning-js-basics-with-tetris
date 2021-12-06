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
Object.freeze(KEY);

export const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

export function getRandomShapes() {
    return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}

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

export const POINTS = {
    SINGLE: 50,
    DOUBLE: 150,
    TRIPLE: 300,
    TETRIS: 500
}

export const COMBO_BONUS = [1, 1.05, 1.1, 1.12, 1.15, 1.18, 1.2, 1.23, 1.25, 1.27, 1.3, 1.5];

export const LEVEL_UP_BORDER = [0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000];
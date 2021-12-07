import {addLines, addScore} from './account.js';
import {POINTS_PER_LINE, MULTIPLY_POINTS_BY_COMBO} from  './constants.js';

let combo = -1; // tetris wiki에서 combo 는 -1 로 시작된다고 명시

export function scoring(clearedLineCount) {
    let score = 0;
    
    if(clearedLineCount == 0) {
        combo = -1;
    } else {
        combo++;

        score += 
        clearedLineCount == 0 ? 0 :
        clearedLineCount == 1 ? POINTS_PER_LINE.SINGLE :
        clearedLineCount == 2 ? POINTS_PER_LINE.DOUBLE :
        clearedLineCount == 3 ? POINTS_PER_LINE.TRIPLE :
        clearedLineCount >= 4 ? POINTS_PER_LINE.TETRIS : POINTS_PER_LINE.TETRIS;

        score *= MULTIPLY_POINTS_BY_COMBO[combo];
    }

    addLines(clearedLineCount);
    addScore(Math.floor(score));
}

export function resetCombo() {
    combo = -1;
}
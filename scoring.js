import {addLines, addScore} from './account.js';
import {POINTS, COMBO_BONUS} from  './constants.js';

let combo = -1; // tetris 규칙에서 combo 는 -1 로 시작된다고 명시되어 있다.

export function scoring(clearedLineCount) {
    let score = 0;
    
    if(clearedLineCount == 0) {
        combo = -1;
    } else {
        combo++;

        score += 
        clearedLineCount == 0 ? 0 :
        clearedLineCount == 1 ? POINTS.SINGLE :
        clearedLineCount == 2 ? POINTS.DOUBLE :
        clearedLineCount == 3 ? POINTS.TRIPLE :
        clearedLineCount >= 4 ? POINTS.TETRIS : POINTS.TETRIS;

        score *= COMBO_BONUS[combo];
    }

    addLines(clearedLineCount);
    addScore(Math.floor(score));
}

export function resetCombo() {
    combo = -1;
}
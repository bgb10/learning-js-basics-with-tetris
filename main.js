import Board from './board.js';
import Animator from './animator.js';
import {KEY, LEVEL_UP_BORDER, LEVEL_DROP_PERIOD} from './constants.js';
import { resetScore, resetLines, addLevel, accountValues, resetLevel } from './account.js';
import { resetCombo, scoring } from './scoring.js';
import {mute, playBackgroundMusic, playPressStartButtonSound, playPauseAndResumeSound, playHardDropSound, playBlockMoveSound, playClearLineSound, playGameOverSound} from './sounds.js';
import { ANIMATION_FRAME } from './settings.js';
import { generateBlock, resetGeneratedBlock } from './blockGenerator.js';

let board = new Board();
let animator = new Animator(board);

let isPaused = false;

let soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', mute);

let playButton = document.getElementById('play-button');
playButton.addEventListener('click', play);

let dropBlockIntervalKey = null;
let animateIntervalKey = null;

function play() {
    reset();

    document.addEventListener('keydown', inputBlockMovement);
    document.addEventListener('keydown', inputSettings);

    //TODO: 게임오버를 관장하는 함수를 아래에 넣어서 drop 하기 전이나 block 을 컨트롤 하기 전에 체크할 것
    dropBlockIntervalKey = setInterval(dropBlockToBoard, LEVEL_DROP_PERIOD[1]);
    animateIntervalKey = setInterval(animator.render.bind(animator), ANIMATION_FRAME);

    playBackgroundMusic();
    playPressStartButtonSound();
}

function dropBlockToBoard() {
    if(isGameOver()) {
        gameOver();
        return;
    }

    if(board.isBlockMovableToDown()) {
        board.moveBlockDown();

        if(board.isBlockFixed()) {
            putBlockAndClearLineWithScoringAndGenerateNewBlock();
        }
        // 블록이 고정된 경우가 아니면 한 턴 더 움직일 수 있게 함.
    } else {
        putBlockAndClearLineWithScoringAndGenerateNewBlock();
    }

    // change drop speed when reached new level
    if(accountValues.score >= LEVEL_UP_BORDER[accountValues.level + 1]) {
        // level up
        addLevel();
        // accelerate
        clearInterval(dropBlockIntervalKey);
        dropBlockIntervalKey = setInterval(dropBlockToBoard, LEVEL_DROP_PERIOD[accountValues.level]);
    }
}

// TODO: board 에서 main.js 에 있는 함수를 끌어다 쓰는게 옳은 일일까?
export function putBlockAndClearLineWithScoringAndGenerateNewBlock() {
    board.putBlock();

    clearLineWithScoring();

    generateNewBlock();
}

function clearLineWithScoring() {
    let clearedLineCount = board.clearLine();
    
    if(clearedLineCount != 0) {
        playClearLineSound();
    }

    scoring(clearedLineCount);
}

function generateNewBlock() {
    let nextBlock = generateBlock();

    if(board.isPuttableBlock(nextBlock)) {
        board.currentBlock = nextBlock;
    } else {
        gameOver();
        return;
    }
}

function isGameOver() {
    if(board.isCurrentBlockNotPuttable()) {
        return true;
    } else {
        return false;
    }
}

export function gameOver() {
    reset();

    animator.showGameOver();

    playGameOverSound();
}

function pause() {
    isPaused = true;

    document.removeEventListener('keydown', inputBlockMovement);

    clearInterval(dropBlockIntervalKey);
    clearInterval(animateIntervalKey);

    playPauseAndResumeSound();
}

function resume() {
    isPaused = false;

    document.addEventListener('keydown', inputBlockMovement);

    dropBlockIntervalKey = setInterval(board.dropBlock.bind(board), 1000);
    animateIntervalKey = setInterval(animator.render.bind(animator), ANIMATION_FRAME);

    playPauseAndResumeSound();
}

function reset() {
    isPaused = false;

    document.removeEventListener('keydown', inputBlockMovement);
    document.removeEventListener('keydown', inputSettings);

    resetLines();
    resetScore();
    resetLevel();
    resetCombo();
    resetGeneratedBlock();
    
    clearInterval(dropBlockIntervalKey);
    clearInterval(animateIntervalKey);

    board.reset();
    animator.reset();
}

function inputBlockMovement(event) {
    event.preventDefault();

    if(isGameOver()) {
        gameOver();
        return;
    }
    
    switch(event.keyCode) {
        case KEY.SPACE:
            board.hardDrop();
            break;
        case KEY.UP:
            board.rotate();
            break;
        case KEY.DOWN:
            board.moveBlockDown();
            break;
        case KEY.LEFT:
            board.moveLeft();
            break;
        case KEY.RIGHT:
            board.moveRight();
            break;
    }

    switch(event.keyCode) {
        case KEY.SPACE:
            playHardDropSound();
            break;
        case KEY.UP:
        case KEY.DOWN:
        case KEY.LEFT:
        case KEY.RIGHT:
            playBlockMoveSound();
            break;
    }
}

function inputSettings(event) {
    if(event.keyCode == KEY.P) {
        if(isPaused) {
            resume();
        } else {
            pause();
        }
    }
}
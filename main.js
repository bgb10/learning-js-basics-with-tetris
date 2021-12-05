import Board from './board.js';
import Animator from './animator.js';
import Block from './block.js';
import {KEY} from './constants.js';
import {mute, playBackgroundMusic, playPressStartButtonSound, playPauseAndResumeSound, playHardDropSound, playBlockMoveSound, playGameOverSound} from './sounds.js';
import { ANIMATION_FRAME } from './settings.js';

let board = new Board();
let animator = new Animator(board);

let isPaused = false;

let soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', mute);

let dropBlockIntervalKey = null;
let animateIntervalKey = null;

function play() {
    reset();

    document.addEventListener('keydown', inputBlockMovement);
    document.addEventListener('keydown', inputSettings);

    //TODO: 게임오버를 관장하는 함수를 아래에 넣어서 drop 하기 전이나 block 을 컨트롤 하기 전에 체크할 것
    dropBlockIntervalKey = setInterval(dropBlockToBoard.bind(board), 1000);
    animateIntervalKey = setInterval(animator.render.bind(animator), ANIMATION_FRAME);

    playBackgroundMusic();
    playPressStartButtonSound();
}

function dropBlockToBoard() {
    //TODO: BlockGenerator 로 바꿀 예정
    if(this.currentBlock == null) {
        this.currentBlock = new Block();
    }

    if(isGameOver()) {
        gameOver();

        return;
    }
    
    //TODO: BlockDropper 로 바꿀 예정
    //이제 board는 Block를 drop할 필요가 없다. 완전 별개로 작동.
    this.dropBlock();
}

function isGameOver() {
    if(board.isCurrentBlockNotPuttable()) {
        return true;
    } else {
        return false;
    }
}

function gameOver() {
    reset();

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
            board.moveDown();
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

window.play = play;

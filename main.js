import Board from './board.js';
import Animator from './animator.js';
import {KEY} from './constants.js';
import {playBackgroundMusic, playPressStartButtonSound, playPauseAndResumeSound, playHardDropSound, playBlockMoveSound} from './sounds.js';
import { ANIMATION_FRAME } from './settings.js';

let board = new Board();
let animator = new Animator(board);

let isPaused = false;

let soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', playBackgroundMusic);

let dropIntervalKey = null;
let animateIntervalKey = null;

function play() {
    reset();

    document.addEventListener('keydown', inputBlockMovement);
    document.addEventListener('keydown', inputSettings);

    //TODO: 게임오버를 관장하는 함수를 아래에 넣어서 drop 하기 전이나 block 을 컨트롤 하기 전에 체크할 것
    dropIntervalKey = setInterval(board.dropPiece.bind(board), 1000);
    animateIntervalKey = setInterval(animator.render.bind(animator), ANIMATION_FRAME);

    playBackgroundMusic();
    playPressStartButtonSound();
}

function pause() {
    isPaused = true;

    document.removeEventListener('keydown', inputBlockMovement);

    clearInterval(dropIntervalKey);
    clearInterval(animateIntervalKey);

    playPauseAndResumeSound();
}

function resume() {
    isPaused = false;

    document.addEventListener('keydown', inputBlockMovement);

    dropIntervalKey = setInterval(board.dropPiece.bind(board), 1000);
    animateIntervalKey = setInterval(animator.render.bind(animator), ANIMATION_FRAME);

    playPauseAndResumeSound();
}

function reset() {
    isPaused = false;

    document.removeEventListener('keydown', inputBlockMovement);
    document.removeEventListener('keydown', inputSettings);

    clearInterval(dropIntervalKey);
    clearInterval(animateIntervalKey);

    board.reset();
    animator.reset();
}

function inputBlockMovement(event) {
    event.preventDefault();
    
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

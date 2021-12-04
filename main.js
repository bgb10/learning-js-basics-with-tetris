import Board from './board.js';
import Animator from './animator.js';
import {KEY} from './constants.js';

let board = new Board();
let animator = new Animator(board);

let isPaused = false;

let backgroundMusic = new Audio('./assets/background-music.m4a');
let hardDropSound = new Audio('./assets/hard-drop.wav');
let blockMoveSound = new Audio('./assets/block-move.wav');
let pauseAndResumeSound = new Audio('./assets/pause-and-resume.wav');
let pressStartButtonSound = new Audio('./assets/press-start-button.wav');

function play() {
    reset();

    document.addEventListener('keydown', inputBlockMovement);
    document.addEventListener('keydown', inputSettings);

    board.start();

    animator.start();

    pressStartButtonSound.currentTime = 0;
    pressStartButtonSound.play();
}

function pause() {
    isPaused = true;

    document.removeEventListener('keydown', inputBlockMovement);

    board.pause();

    animator.pause();

    pauseAndResumeSound.currentTime = 0;
    pauseAndResumeSound.play();
}

function resume() {
    isPaused = false;

    document.addEventListener('keydown', inputBlockMovement);

    board.resume();

    animator.resume();

    pauseAndResumeSound.currentTime = 0;
    pauseAndResumeSound.play();
}

function reset() {
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
            hardDropSound.pause();
            hardDropSound.currentTime = 0;
            hardDropSound.play();
            break;
        case KEY.UP:
        case KEY.DOWN:
        case KEY.LEFT:
        case KEY.RIGHT:
            blockMoveSound.pause();
            blockMoveSound.currentTime = 0;
            blockMoveSound.play();
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

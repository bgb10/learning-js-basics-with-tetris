import Board from './board.js';
import Animator from './animator.js';
import {KEY} from './constants.js';
import {playBackgroundMusic, playPressStartButtonSound, playPauseAndResumeSound, playHardDropSound, playBlockMoveSound} from './sounds.js';

let board = new Board();
let animator = new Animator(board);

let isPaused = false;

let soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', playBackgroundMusic);

function play() {
    playBackgroundMusic();

    reset();

    document.addEventListener('keydown', inputBlockMovement);
    document.addEventListener('keydown', inputSettings);

    board.start();

    animator.start();

    playPressStartButtonSound();
}

function pause() {
    isPaused = true;

    document.removeEventListener('keydown', inputBlockMovement);

    board.pause();

    animator.pause();

    playPauseAndResumeSound();
}

function resume() {
    isPaused = false;

    document.addEventListener('keydown', inputBlockMovement);

    board.resume();

    animator.resume();

    playPauseAndResumeSound();
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

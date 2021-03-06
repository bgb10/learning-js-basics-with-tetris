let backgroundMusic = new Audio('./sounds/background-music.m4a');
backgroundMusic.loop = true;
let hardDropSound = new Audio('./sounds/hard-drop.wav');
let blockMoveSound = new Audio('./sounds/block-move.wav');
let pauseAndResumeSound = new Audio('./sounds/pause-and-resume.wav');
let pressStartButtonSound = new Audio('./sounds/press-start-button.wav');
let clearLineSound = new Audio('./sounds/clear-line.wav');
let gameOverSound = new Audio('./sounds/game-over.wav');

let soundImgElement = document.getElementById("sound-img");

export function mute() {
    this.classList.toggle('muted');

    if(this.classList.contains('muted')) {
        backgroundMusic.muted = false;
        hardDropSound.muted = false;
        blockMoveSound.muted = false;
        pauseAndResumeSound.muted = false;
        pressStartButtonSound.muted = false;
        clearLineSound.muted = false;
        gameOverSound.muted = false;

        soundImgElement.src = "https://img.icons8.com/material-rounded/24/000000/room-sound.png";
    } else {
        backgroundMusic.muted = true;
        hardDropSound.muted = true;
        blockMoveSound.muted = true;
        pauseAndResumeSound.muted = true;
        pressStartButtonSound.muted = true;
        clearLineSound.muted = true;
        gameOverSound.muted = true;

        soundImgElement.src = "https://img.icons8.com/material-rounded/24/000000/mute.png";
    }
}

export function playBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
}

export function playHardDropSound() {
    hardDropSound.pause();
    hardDropSound.currentTime = 0;
    hardDropSound.play();
}

export function playBlockMoveSound() {
    blockMoveSound.pause();
    blockMoveSound.currentTime = 0;
    blockMoveSound.play();
}

export function playPauseAndResumeSound() {
    pauseAndResumeSound.currentTime = 0;
    pauseAndResumeSound.play();
}

export function playPressStartButtonSound() {
    pressStartButtonSound.currentTime = 0;
    pressStartButtonSound.play();
}

export function playClearLineSound() {
    clearLineSound.currentTime = 0;
    clearLineSound.play();
}

export function playGameOverSound() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
}
let backgroundMusic = new Audio('./assets/background-music.m4a');
let hardDropSound = new Audio('./assets/hard-drop.wav');
let blockMoveSound = new Audio('./assets/block-move.wav');
let pauseAndResumeSound = new Audio('./assets/pause-and-resume.wav');
let pressStartButtonSound = new Audio('./assets/press-start-button.wav');
let clearLineSound = new Audio('./assets/clear-line.wav');

export function playBackgroundMusic() {
    let isPlaying = false;
    
    if(isPlaying) {
        backgroundMusic.pause();
        isPlaying = false;
    } else {
        backgroundMusic.play();
        isPlaying = true;
    }
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
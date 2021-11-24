let board = new Board();
let animator = new Animator(board);

let isPaused = false;

let accountValues = {
    score: 0,
    lines: 0
}

function play() {
    reset();

    board.start();

    animator.start();
}

function reset() {
    board.reset();

    animator.reset();
}

function pause() {
    isPaused = true;

    document.removeEventListener('keydown', inputBlockMovement);

    board.pause();

    animator.pause();
}

function resume() {
    isPaused = false;

    document.addEventListener('keydown', inputBlockMovement);

    board.resume();

    animator.resume();
}

document.addEventListener('keydown', event => {
    if(event.keyCode == KEY.P) {
        if(isPaused) {
            resume();
        } else {
            pause();
        }
    }
});

document.addEventListener('keydown', inputBlockMovement);

function inputBlockMovement(event) {
    // 이벤트 버블링 막기
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
}
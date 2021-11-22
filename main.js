let board = new Board();
let animator = new Animator(board);

function play() {
    reset();

    board.start();

    animator.animate();
}

function reset() {
    board.reset();

    animator.reset();
}

function pause() {
    // document 에 eventListener 제거

    // board stop
    // animator stop
}

document.addEventListener('keydown', event => {
    // TODO: 이벤트 버블링 고려해야하는지 확인
    
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
})


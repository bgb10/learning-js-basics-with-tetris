let board = new Board();
let animator = new Animator(board);

var score = 0;

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
})


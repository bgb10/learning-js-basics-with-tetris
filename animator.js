class Animator {
    canvas;
    ctx;
    
    board;

    renderIntervalKey;

    constructor(board) {
        this.board = board;
        
        this.canvas = document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');

        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }

    start() {
        this.renderIntervalKey = setInterval(this.render, 50, this);
    }

    reset() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        clearInterval(this.renderIntervalKey);
    }

    pause() {
        clearInterval(this.renderIntervalKey);
    }

    resume() {
        this.renderIntervalKey = setInterval(this.render, 50, this);
    }
    
    render(animator) {
        animator.ctx.clearRect(0, 0, animator.ctx.canvas.width, animator.ctx.canvas.height);
        
        board.currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    animator.ctx.fillStyle = COLORS[value - 1];

                    animator.ctx.fillRect(board.currentPiece.x + x, board.currentPiece.y + y, 1, 1);
                }
            })
        })

        animator.board.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                // this.x, this.y 는 shape의 상단 왼쪽 좌표이다.
                // shape 안에 있는 블록 좌표에 x, y를 더한다.
                // 보드에서 블록의 좌표는 this.x + x, this.y + y 가 된다.
                if(value > 0) {
                    animator.ctx.fillStyle = COLORS[value - 1];

                    animator.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }
}
class Animator {
    canvas;
    ctx;
    board;

    constructor(board) {
        this.board = board;
        
        this.canvas = document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');

        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
    
    reset() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        clearInterval(this.render);
    }

    animate() {
        setInterval(this.render, 100, this);
    }

    render(animator) {
        animator.reset();
        
        // TODO: grid 에 있는 블록 뿐만 아니라 currentPiece 도 출력해야 하는가? yes
        board.currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    animator.ctx.fillStyle = board.currentPiece.color;

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

                    animator.ctx.fillRect(animator.x + x, animator.y + y, 1, 1);
                }
            });
        });

        // console.dir(animator.board.currentPiece)
        // console.table(animator.board.grid);
    }
}
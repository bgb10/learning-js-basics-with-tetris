import {ROWS, COLS, BLOCK_SIZE, COLORS} from './constants.js';

export default class Animator {
    ctx;
    
    board;

    constructor(board) {
        this.board = board;
        
        let canvas = document.getElementById('board');
        this.ctx = canvas.getContext('2d');

        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }

    reset() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    
    render() {
        this.reset();
        
        this.board.currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    this.ctx.fillStyle = COLORS[value - 1];

                    this.ctx.fillRect(this.board.currentPiece.x + x, this.board.currentPiece.y + y, 1, 1);
                }
            })
        })

        this.board.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                // this.x, this.y 는 shape의 상단 왼쪽 좌표이다.
                // shape 안에 있는 블록 좌표에 x, y를 더한다.
                // 보드에서 블록의 좌표는 this.x + x, this.y + y 가 된다.
                if(value > 0) {
                    this.ctx.fillStyle = COLORS[value - 1];

                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }
}
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

    showGameOver() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(1, 3, 8, 1.2);
        this.ctx.font = '1px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText('GAME OVER', 1.8, 4);
    }
    
    render() {
        this.reset();
        
        if(this.board.currentBlock != null) {
            this.board.currentBlock.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value > 0) {
                        this.ctx.fillStyle = COLORS[value - 1];
    
                        this.ctx.fillRect(this.board.currentBlock.x + x, this.board.currentBlock.y + y, 1, 1);
                    }
                })
            })
        }

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
import accountValues from './account.js';
import Piece from './piece.js';
import {ROWS, COLS} from './constants.js';

export default class Board {
    grid;

    currentPiece;

    dropPieceIntervalFlag;

    start() {
        this.currentPiece = new Piece();

        this.startPieceDrops();
    }

    reset() {
        this.grid = this.getEmptyBoard();
        this.currentPiece = null;
        this.stopPieceDrops();
    }

    getEmptyBoard() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        );
    }

    pause() {
        this.stopPieceDrops();
    } 

    resume() {
        this.startPieceDrops();
    }

    startPieceDrops() {
        this.dropPieceIntervalFlag = setInterval(this.dropPiece.bind(this), 1000);
    }

    stopPieceDrops() {
        clearInterval(this.dropPieceIntervalFlag);
    }

    dropPiece() {
        // 블록이 아래로 내려갈 수 없는 경우 바닥에 닿은 것이므로 블록을 그대로 보드에 고정한다.        
        if(!this.isMovableToDown()) {
            this.putCurrentPieceOnGrid();
    
            this.clearLine();
    
            this.currentPiece = new Piece();
    
            return;
        }
        
        // 블록을 아래로 내린다.
        this.moveDown();
    
        // 블록을 아래로 내렸는데 블록이 고정된 경우 그대로 보드에 고정한다.
        /* 여기서 블록이 고정(하, 좌, 우, 회전 모두 불가시)되지만 않으면 아래 if문을 통과하는데, 
        아래로 내려갈 수는 없지만 옆으로 이동할 수 있는 경우, 1초의 term 을 둬서 그 동안 좌우 이동 또는 회전할 수 있기 위함이다. */
        if(this.isCurrentPieceFixed()) {
            this.putCurrentPieceOnGrid();
    
            this.clearLine();
    
            this.currentPiece = new Piece();

            return;
        }
    
        this.clearLine();
    }

    clearLine() {
        // line clearing
        let clearedGrid = this.grid.filter((row) => {
            return !row.every((value) => {
                return value != 0;
            });
        });

        let emptyGrid = this.getEmptyBoard();
        let newGrid = emptyGrid.slice(0, -(clearedGrid.length));
        newGrid = newGrid.concat(clearedGrid);

        this.grid = newGrid;

        // scoring
        let clearedLineCount = emptyGrid.length - clearedGrid.length;
        this.scoring(clearedLineCount);
    }

    scoring(clearedLineCount) {
        accountValues.lines += clearedLineCount;
        accountValues.score += clearedLineCount * 10;
        
        let lines = document.getElementById("lines");
        lines.innerText = accountValues.lines;

        let score = document.getElementById("score");
        score.innerText = accountValues.score;
    }

    putCurrentPieceOnGrid() {
        this.currentPiece.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                let x = this.currentPiece.x + dx;
                let y = this.currentPiece.y + dy;
                
                if(value != 0) {
                    this.grid[y][x] = value;
                }
            });
        });

        this.currentPiece = null;
    }

    isCurrentPieceFixed() {
        if(!this.isRotatable() && !this.isMovableToDown() && !this.isMovableToLeft() && !this.isMovableToRight()) {
            return true;
        } 

        return false;
    }

    rotate() {
        if(this.isRotatable()) {
            this.currentPiece.rotate();
        }
    }

    isRotatable() {
        let rotatedPiece = this.currentPiece.getCopy();

        rotatedPiece.rotate();

        if(this.isValid(rotatedPiece)) {
            return true;
        } else {
            return false;
        }
    }

    hardDrop() {
        while(this.isMovableToDown()) {
            this.currentPiece.moveDown();
        }

        this.putCurrentPieceOnGrid();

        this.currentPiece = new Piece();
    }
    
    moveDown() {
        if(this.isMovableToDown()) {
            this.currentPiece.moveDown();
        }
    }

    isMovableToDown() {
        let moveDownPiece = this.currentPiece.getCopy();

        moveDownPiece.moveDown();

        if(this.isValid(moveDownPiece)) {
            return true;
        } else {
            return false;
        }
    }

    moveLeft() {
        if(this.isMovableToLeft()) {
            this.currentPiece.moveLeft();
        }
    }

    isMovableToLeft() {
        let moveLeftPiece = this.currentPiece.getCopy();

        moveLeftPiece.moveLeft();
        
        if(this.isValid(moveLeftPiece)) {
            return true;
        } else {
            return false;
        }
    }

    moveRight() {
        if(this.isMovableToRight()) {
            this.currentPiece.moveRight();
        }
    }

    isMovableToRight() {
        let moveRightPiece = this.currentPiece.getCopy();

        moveRightPiece.moveRight();

        if(this.isValid(moveRightPiece)) {
            return true;
        } else {
            return false;
        }
    }

    isValid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value == 0 ||
                    (
                        this.insideWalls(x) &&
                        this.aboveFloor(y) && 
                        this.grid[y][x] == 0
                    )
                );
            });
        });
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y < ROWS;
    }
}
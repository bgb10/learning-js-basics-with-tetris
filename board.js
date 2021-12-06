import { addLines, addScore } from './account.js';
import { generateBlock } from './blockGenerator.js';
import {ROWS, COLS} from './constants.js';
import { playClearLineSound, playGameOverSound } from './sounds.js';
import { gameOver } from './main.js';

export default class Board {
    grid;

    currentBlock;

    reset() {
        this.grid = this.getEmptyBoard();
        this.currentBlock = generateBlock();
    }

    getEmptyBoard() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        );
    }

    isCurrentBlockNotPuttable() {
        if(!this.isPuttableBlock(this.currentBlock)) {
            return true;
        }

        return false;
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
        if(clearedLineCount != 0) {
            playClearLineSound();
        }

        addLines(clearedLineCount);
        addScore(clearedLineCount * 10);
    }

    putCurrentBlockOnGrid() {
        this.currentBlock.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                let x = this.currentBlock.x + dx;
                let y = this.currentBlock.y + dy;
                
                if(value != 0) {
                    this.grid[y][x] = value;
                }
            });
        });

        this.currentBlock = null;
    }

    isCurrentBlockFixed() {
        if(!this.isRotatable() && !this.isMovableToDown() && !this.isMovableToLeft() && !this.isMovableToRight()) {
            return true;
        } 

        return false;
    }

    rotate() {
        if(this.isRotatable()) {
            this.currentBlock.rotate();
        }
    }

    isRotatable() {
        let rotatedBlock = this.currentBlock.getCopy();

        rotatedBlock.rotate();

        if(this.isPuttableBlock(rotatedBlock)) {
            return true;
        } else {
            return false;
        }
    }

    hardDrop() {
        while(this.isMovableToDown()) {
            this.currentBlock.moveDown();
        }

        this.putCurrentBlockOnGrid();

        this.currentBlock = generateBlock();
    }
    
    moveDown() {
        if(this.isMovableToDown()) {
            this.currentBlock.moveDown();
        }
    }

    isMovableToDown() {
        let moveDownBlock = this.currentBlock.getCopy();

        moveDownBlock.moveDown();

        if(this.isPuttableBlock(moveDownBlock)) {
            return true;
        } else {
            return false;
        }
    }

    moveLeft() {
        if(this.isMovableToLeft()) {
            this.currentBlock.moveLeft();
        }
    }

    isMovableToLeft() {
        let moveLeftBlock = this.currentBlock.getCopy();

        moveLeftBlock.moveLeft();
        
        if(this.isPuttableBlock(moveLeftBlock)) {
            return true;
        } else {
            return false;
        }
    }

    moveRight() {
        if(this.isMovableToRight()) {
            this.currentBlock.moveRight();
        }
    }

    isMovableToRight() {
        let moveRightBlock = this.currentBlock.getCopy();

        moveRightBlock.moveRight();

        if(this.isPuttableBlock(moveRightBlock)) {
            return true;
        } else {
            return false;
        }
    }

    isPuttableBlock(p) {
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
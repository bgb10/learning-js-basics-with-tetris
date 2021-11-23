class Board {
    grid;
    
    flag;

    start() {
        this.currentPiece = new Piece();

        this.startPieceDrops();
    }

    startPieceDrops() {
        this.flag = setInterval(this.dropPiece, 1000, this);
    }

    dropPiece(board) {        
        // 여기 있는 this가... window 객체임 ㅋㅋㅋ
        // 이미 바닥에 붙은 경우
        if(!board.isMovableToDown()) {
            board.putCurrentPieceOnGrid();

            board.clearLine();

            board.currentPiece = new Piece();

            return;
        }
        
        board.moveDown();

        if(board.isCurrentPieceFixed()) {
            console.log("dsaff");

            board.putCurrentPieceOnGrid();

            board.clearLine();

            board.currentPiece = new Piece();
        }

        board.clearLine();
    }

    clearLine() {
        // clear 된 라인 지우고 남아있는 라인만 만듦.
        let clearedGrid = this.grid.filter((row) => {
            return !row.every((value) => {
                return value != 0;
            });
        });

        // 라인을 배열 오른쪽 끝으로 밀기
        let emptyGrid = this.getEmptyBoard();
        
        score += (emptyGrid.length - clearedGrid.length);
        console.log(score);
        
        let newGrid = emptyGrid.slice(0, -(clearedGrid.length));
        newGrid = newGrid.concat(clearedGrid);

        this.grid = newGrid;
    }

    putCurrentPieceOnGrid() {
        // index 숫자를 grid 에 모양대로 대입
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

    reset() {
        this.currentPiece = null;
        this.grid = this.getEmptyBoard();
        this.stopPieceDrops();
    }

    stopPieceDrops() {
        clearInterval(this.flag);
    }

    getEmptyBoard() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        );
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
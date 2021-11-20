class Board {
    grid;

    // 새 게임이 시작되면 보드를 초기화한다.
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // 0으로 채워진 행렬을 얻는다.
    getEmptyBoard() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        );
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    this.isEmpty(value) ||
                    (this.insideWalls(x) &&
                        this.aboveFloor(y))
                );
            });
        });
    }

    rotate(p) {
        // deep copy 및 immtability 를 위해 JSON 으로 복사
        let clone = JSON.parse(JSON.stringify(p));

        // 행렬을 변환한다. p는 Piece의 인스턴스이다.
        for (let y = 0; y < clone.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [clone.shape[x][y], clone.shape[y][x]] =
                    [clone.shape[y][x], clone.shape[x][y]];
            }
        }

        // 열 순서대로 뒤집는다.
        clone.shape.forEach(row => row.reverse());

        return clone;
    }

    isEmpty(value) {
        return value == 0;
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y < ROWS;
    }
}
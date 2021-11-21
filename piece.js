class Piece {
    x;
    y;
    color;
    shape;

    constructor() {
        this.randomizedSpawn();
    }

    randomizedSpawn() {
        this.color = getRandomColors();
        this.shape = getRandomShapes();

        // Starting position
        this.x = 3;
        this.y = 0;
    }

    getCopy() {
        let copied = new Piece();

        copied.changeTo(this);

        return copied;
    }

    rotate() {
        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [this.shape[x][y], this.shape[y][x]] =
                [this.shape[y][x], this.shape[x][y]];
            }
        }

        this.shape.forEach(row => row.reverse());
    }

    moveDown() {
        this.y++;
    }

    moveLeft() {
        this.x--;
    }

    moveRight() {
        this.x++;
    }

    changeTo(p) {
        this.x = p.x;
        this.y = p.y;
        this.color = p.color;
        this.shape = JSON.parse(JSON.stringify(p.shape));
    }
}
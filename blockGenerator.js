import Block from "./block.js";
import {SHAPES} from "./constants.js";

let blocks = [];

export function generateBlock() {
    if(Array.isArray(blocks) && blocks.length == 0) {
        // generate blocks sequentially
        SHAPES.forEach((row, shapeIndex) => {
            blocks.push(new Block(shapeIndex));
        });

        // shuffle
        shuffle(blocks);
    }

    return blocks.pop();
}

export function resetGeneratedBlock() {
    blocks = [];
}

function shuffle(array) { array.sort(() => Math.random() - 0.5); }
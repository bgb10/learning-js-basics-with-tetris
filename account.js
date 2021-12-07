let linesElement = document.getElementById("lines");
let scoreElement = document.getElementById("score");
let levelElement = document.getElementById("level");
        
export let accountValues = {
    score: 0,
    lines: 0,
    level: 1
}

export function setLines(lines) {
    accountValues.lines = lines;
    linesElement.innerText = accountValues.lines;
}

export function addLines(lines) {
    accountValues.lines += lines;
    linesElement.innerText = accountValues.lines;
}

export function setScore(score) {
    accountValues.score = score;
    scoreElement.innerText = accountValues.score;
}

export function addScore(score) {
    accountValues.score += score;
    scoreElement.innerText = accountValues.score;
}

export function resetLines() {
    accountValues.lines = 0;
    linesElement.innerText = 0;
}

export function resetScore() {
    accountValues.score = 0;
    scoreElement.innerText = 0;
}

export function resetLevel() {
    accountValues.level = 0;
    levelElement.innerText = 1;
}

export function addLevel() {
    levelElement.innerText = ++accountValues.level;
}
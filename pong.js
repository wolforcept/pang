const S = 32, SB = 16;
let colorTrue, colorFalse;

// let xTrue = S * SB / 2 - S / 2, yTrue = S / 2, xFalse = xTrue, yFalse = S * SB - S;
// let dxTrue = 5, dyTrue = 4, dxFalse = -5, dyFalse = -4;

let xTrue = S / 2, yTrue = S / 2, xFalse = SB * S - S / 2, yFalse = SB * S - S / 2;
let trueRandom = Math.random();
let falseRandom = Math.random();
let dxTrue = 6 + trueRandom, dyTrue = 7 - trueRandom, dxFalse = -7 + falseRandom, dyFalse = -6 - falseRandom;

let board = [];

function setup() {
    createCanvas(S * SB, S * SB);
    colorTrue = color(247, 164, 69);
    colorFalse = color(84, 42, 156);

    noStroke();
    fill(colorTrue)

    // const vertical = Math.random() < .5;

    for (let x = 0; x < SB; x++) {
        board[x] = [];
        for (let y = 0; y < SB; y++) {
            // const isTrue = vertical ?  (x >= SB / 2): (y >= SB / 2);
            const isTrue = x >= SB / 2;
            board[x][y] = isTrue;
        }
    }

    mouseClicked(false);
}

function mouseClicked(shouldChangeColors = true) {
    const r1 = Math.random() * 255;
    const g1 = Math.random() * 255;
    const b1 = Math.random() * 255;
    const r2 = 255 - r1;
    const g2 = 255 - g1;
    const b2 = 255 - b1;

    colorTrue = color(r1, g1, b1);
    colorFalse = color(r2, g2, b2);

    {
        const elem1 = document.getElementById("nr2wrapper");
        elem1.style.backgroundColor = rgbToHex(r1, g1, b1);
        elem1.style.color = rgbToHex(r2, g2, b2);

        const elem2 = document.getElementById("nr1wrapper");
        elem2.style.color = rgbToHex(r1, g1, b1);
        elem2.style.backgroundColor = rgbToHex(r2, g2, b2);
    }
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(Number.parseInt(r)) + componentToHex(Number.parseInt(g)) + componentToHex(Number.parseInt(b));
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function draw() {

    var colorsTrue = 0;
    var colorsFalse = 0;
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            fill(board[x][y] ? colorTrue : colorFalse);
            rect(x * S, y * S, S, S);

            if (board[x][y]) colorsTrue++;
            else colorsFalse++;
        }
    }

    {
        const elem1 = document.getElementById("nr2");
        elem1.innerHTML = "" + colorsTrue;

        const elem2 = document.getElementById("nr1");
        elem2.innerHTML = "" + colorsFalse;
    }

    fill(colorTrue)
    rect(xTrue - S / 2, yTrue - S / 2, S, S);
    //fill(255, 255, 255)
    //rect(xTrue, yTrue, 1, 1);

    fill(colorFalse)
    rect(xFalse - S / 2, yFalse - S / 2, S, S);
    //fill(0, 0, 0)
    //rect(xFalse, yFalse, 1, 1);

    // TRUE MOVEMENT
    {
        if (xTrue + dxTrue < S / 2 || xTrue + dxTrue > S * SB - S / 2)
            dxTrue = -dxTrue;
        if (yTrue + dyTrue < S / 2 || yTrue + dyTrue > S * SB - S / 2)
            dyTrue = -dyTrue;

        const currX = Math.floor((xTrue) / S);
        const currY = Math.floor((yTrue) / S);
        const nextX = Math.floor((xTrue + dxTrue + (dxTrue > 0 ? S / 2 : -S / 2)) / S);
        const nextY = Math.floor((yTrue + dyTrue + (dyTrue > 0 ? S / 2 : -S / 2)) / S);
        if (nextX >= 0 && nextX < SB && board[nextX][currY]) {
            board[nextX][currY] = false;
            dxTrue = -dxTrue;
        }

        if (nextY >= 0 && nextY < SB && board[currX][nextY]) {
            board[currX][nextY] = false;
            dyTrue = -dyTrue;
        }

        xTrue += dxTrue;
        yTrue += dyTrue;
    }

    // FALSE MOVEMENT
    {
        if (xFalse + dxFalse < S / 2 || xFalse + dxFalse > S * SB - S / 2)
            dxFalse = -dxFalse;
        if (yFalse + dyFalse < S / 2 || yFalse + dyFalse > S * SB - S / 2)
            dyFalse = -dyFalse;

        const currX = Math.floor((xFalse) / S);
        const currY = Math.floor((yFalse) / S);
        const nextX = Math.floor((xFalse + dxFalse + (dxFalse > 0 ? S / 2 : -S / 2)) / S);
        const nextY = Math.floor((yFalse + dyFalse + (dyFalse > 0 ? S / 2 : -S / 2)) / S);
        if (nextX >= 0 && nextX < SB && !board[nextX][currY]) {
            board[nextX][currY] = true;
            dxFalse = -dxFalse;
        }

        if (nextY >= 0 && nextY < SB && !board[currX][nextY]) {
            board[currX][nextY] = true;
            dyFalse = -dyFalse;
        }

        xFalse += dxFalse;
        yFalse += dyFalse;
    }

}

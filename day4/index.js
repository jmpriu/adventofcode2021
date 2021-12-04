const { readStringArrayFromFile } = require("../common");
const Board = require("./Board");

const INPUT = readStringArrayFromFile("/day4/input.txt");

const NUMBER_SEQUENCE = INPUT.shift().split(',').map(Number);

let BOARDS = [];

const boardsNumbers = INPUT.filter(v => !!v);
const BOARD_SIZE = 5; // 5 x 5
for (let i = 0, j = boardsNumbers.length; i < j; i+= BOARD_SIZE) {
    BOARDS.push(boardsNumbers.slice(i, i + BOARD_SIZE));
}
BOARDS = BOARDS.map(board => 
    new Board(board.map(row => 
        row.match(/\d+/g).map(Number)
    ))
);

console.log(`
Sequence: ${NUMBER_SEQUENCE}
# BOARDS: ${BOARDS.length}
`);


let winningBoard = -1;
let lastNumberCalled = -1;
for (let i = 0; winningBoard === -1 && i < NUMBER_SEQUENCE.length; i++) {
    lastNumberCalled = NUMBER_SEQUENCE[i];
    for (j = 0; winningBoard === -1 && j < BOARDS.length; j++) {
        BOARDS[j].markNumber(lastNumberCalled);
        if (BOARDS[j].checkIsWinner()) {
            BOARDS[j].calculateScore(lastNumberCalled);
            winningBoard = j;
        }
    }
}

console.log(`
    Winner: #${winningBoard + 1}
    SUM: ${BOARDS[winningBoard].getSumOfUnmatchedNumbers()}
    Last num called: ${lastNumberCalled}
    Answer: ${BOARDS[winningBoard].getScore()}
`);


// Part 2
BOARDS.forEach(board => {
    board.reset();
});
lastNumberCalled = -1;
let lastBoardWon = -1;
for (let i = 0; i < NUMBER_SEQUENCE.length; i++) {
    lastNumberCalled = NUMBER_SEQUENCE[i];
    for (j = 0; j < BOARDS.length; j++) {
        BOARDS[j].markNumber(lastNumberCalled);
        if (BOARDS[j].getScore() < 0 && BOARDS[j].checkIsWinner()) {
            BOARDS[j].calculateScore(lastNumberCalled);
            lastBoardWon = j;
        }
    }
}



console.log(`
    Last winner: #${lastBoardWon + 1}
    Answer: ${BOARDS[lastBoardWon].getScore()}
`);
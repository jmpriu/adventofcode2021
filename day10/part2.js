const { readStringArrayFromFile } = require("../common");

const lines = readStringArrayFromFile("/day10/input.txt");

const Stack = () => {
    const data = [];
    const push = (element) => {
        data.push(element);
    }
    const peek = () => data[data.length - 1];
    const isEmpty = () => data.length === 0;
    const pop = () => {
        data.pop();
    }
    const getStackAsArray = () => data;
    return {
        push, peek, isEmpty, pop, getStackAsArray
    }
}

const LEGAL_OPENING = ['(', '[', '{', '<'];
const LEGAL_CLOSING = [')', ']', '}', '>'];
const MAP_CHARACTERS = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
}
const LEGAL_CHARACTERS = [...LEGAL_OPENING, ...LEGAL_CLOSING];


const findIllegalCharacter = (lineChunks) => {
    let illegal = null;
    const stack = Stack();
    for (let i = 0; i < lineChunks.length && !illegal; i++) {
        const current = lineChunks[i];
        if (LEGAL_CHARACTERS.includes(current)) {
            if (LEGAL_OPENING.includes(current)) {
                stack.push(current);
            } else { // CLOSING CHARACTERS
                if (!stack.isEmpty()) {
                    const lastOpeningCharacter = stack.peek();
                    if (MAP_CHARACTERS[lastOpeningCharacter] === current) {
                        stack.pop();
                    } else {
                        illegal = current;
                    }
                } else {
                    // illegal = current; //CLOSE CHARACTERS BUT NOT REQUIRED
                }
            }
        } else {
            illegal = current;
        }
    }
    return [illegal, stack];
}

const SCORE = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}
const scores = [];
lines.forEach(line => {
    let score = 0;
    const [illegal, stack] = findIllegalCharacter(line.split(''));
    if (!illegal) {
        const expectedChars = stack.getStackAsArray().map(v => MAP_CHARACTERS[v]).reverse()
        for (let i = 0; i < expectedChars.length; i++) {
            score = score*5 + SCORE[expectedChars[i]];
        }
        scores.push(score);
        console.log(`${expectedChars.join('')} - ${score} total points.`)
    }
})

console.log('Middle', scores.sort((a, b) => a - b)[Math.floor(scores.length/2)])
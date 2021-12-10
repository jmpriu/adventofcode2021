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
    return {
        push, peek, isEmpty, pop
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
    if (!stack.isEmpty()) {
        return [illegal, stack.peek()]
    }
    return [illegal, null];
}

const SCORE = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}
let totalScore = 0;
lines.forEach(line => {
    let score = 0;
    const [illegal, expected] = findIllegalCharacter(line.split(''));
    if (illegal) {
        score += SCORE[illegal];
        console.log(`${line} - Expected ${expected}, but found ${illegal} instead.`)
    }
    totalScore += score;
})
console.log(`Score ${totalScore}`)
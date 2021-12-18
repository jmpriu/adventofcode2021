const { readStringArrayFromFile } = require("../common");

const rawInstructionsInput = readStringArrayFromFile("/day13/input.txt");

const processInstructions = (instructionsArray) => {
    const dots = [];
    const folds = [];
    let isDot = true;
    for (let i = 0; i < instructionsArray.length; i++) {
        if (instructionsArray[i] === '') {
            isDot = false;
        } else {
            if (isDot) {
                dots.push(instructionsArray[i].split(',').map(Number));
            } else {
                folds.push(instructionsArray[i].split('fold along ')[1].split('=').map((v, index) => index === 1 ? +v : v))
            }
        }
    }
    return [dots, folds];
}

const getPaperSize = (dots) => {
    let maxX = 0, maxY = 0;
    dots.forEach(([x, y]) => {
        if (x > maxX) {
            maxX = x;
        }
        if (y > maxY) {
            maxY = y;
        }
    })
    return [maxX, maxY];
}

const [dots, folds] = processInstructions(rawInstructionsInput);
const [x, y] = getPaperSize(dots);
console.log(x, y);
const createPaper = (x, y) => {
    return new Array(y + 1).fill(null).map(_ => new Array(x + 1).fill('.'))
}
const paper = createPaper(x, y);

dots.forEach(([x, y]) => paper[y][x] = '#')

const foldPaperWith = (paper, axis, n) => {
    const paperY = paper.length;
    const paperX = paper[0].length;
    let newPaper = null;
    if (axis === 'y') {
        newPaper = createPaper(paperX - 1, (paperY - 1) / 2 - 1);
        for (let y = 0; y < newPaper.length; y++) {
            for (let x = 0; x < newPaper[0].length; x++) {
                newPaper[y][x] = paper[y][x] !== '.' ? paper[y][x] : newPaper[y][x];
                newPaper[y][x] = paper[paperY - y - 1][x] !== '.' ? paper[paperY - y - 1][x] : newPaper[y][x];
            }
        }
    } else {
        newPaper = createPaper((paperX - 1) / 2 - 1, paperY - 1);
        for (let y = 0; y < newPaper.length; y++) {
            for (let x = 0; x < newPaper[0].length; x++) {
                newPaper[y][x] = paper[y][x] !== '.' ? paper[y][x] : newPaper[y][x];
                newPaper[y][x] = paper[y][paperX - x - 1] !== '.' ? paper[y][paperX - x - 1] : newPaper[y][x];
            }
        }
    }
    return newPaper;
}

const printPaper = (paper) => console.log(paper.map(row => row.join('')).join("\n"));



let solution = paper;
folds.forEach(([axis, value]) => {
    solution = foldPaperWith(solution, axis, value);
})

const firstFold = foldPaperWith(paper, folds[0][0], folds[0][1]);

let countDots = 0;
for (let i = 0; i < firstFold.length; i++) {
    for (let j = 0; j < firstFold[0].length; j++) {
        if (firstFold[i][j] === '#') {
            countDots++;
        }
    }
} 
console.log('Dots on first fold:', countDots);
printPaper(solution);
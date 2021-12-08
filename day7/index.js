const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day7/input.txt");

const horizontalPositions = INPUT[0].split(',').map(Number);
console.log(horizontalPositions);

const min = Math.min(...horizontalPositions);
const max = Math.max(...horizontalPositions);

const gaussSum = (n) => n * (n + 1) / 2;

let better = Number.POSITIVE_INFINITY;
for (let candidate = min; candidate <= max; candidate++) {
    const cost = horizontalPositions.reduce((sum, current) => sum + gaussSum(Math.abs(current - candidate)), 0);
    console.log(`Candidate ${candidate} cost ${cost}`)
    if (cost < better) {
        better = cost;
    }
}

console.log('Better ammount', better);
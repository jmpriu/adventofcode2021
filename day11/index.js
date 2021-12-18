const { readStringArrayFromFile } = require("../common");

const dumpOctopus = readStringArrayFromFile("/day11/input.txt").map(row => row.split('').map(Number));

const duplicateMap = (octopusMap) => [...octopusMap.map(row => [...row])];
const printMap = (octopusMap) => {
    console.log(octopusMap.map(row => row.join('')).join('\n'))
}

const flashOctopus = (x, y, octopusMap, flashMap) => {
    if (flashMap[x][y] || x < 0 || y < 0 || x >= octopusMap.length || y >= octopusMap[0].length) {
        return;
    }
    flashMap[x][y] = true;
    const adjacentOctopus = [
        [x - 1, y],
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
        [x, y - 1],
        [x, y + 1]
    ].filter(([x, y]) => !(x < 0 || y < 0 || x >= octopusMap.length || y >= octopusMap[0].length))
    adjacentOctopus.forEach(([adjacentX, adjacentY]) => {
        octopusMap[adjacentX][adjacentY] = octopusMap[adjacentX][adjacentY] + 1;
        if (octopusMap[adjacentX][adjacentY] > 9) {
            flashOctopus(adjacentX, adjacentY, octopusMap, flashMap);
        }
    })
}

const addStep = (octopusMap) => {
    // Increase energy of all + 1
    const nextMap = duplicateMap(octopusMap).map(row => row.map(value => value + 1));
    // If any level is greater than 9 flash and increase the level of adjacents to 1
    const flashMap = nextMap.map(row => row.map(_ => false));
    for (let i = 0; i < nextMap.length; i++) {
        for (let j = 0; j < nextMap[i].length; j++) {
            const currentValue = nextMap[i][j];
            if (currentValue > 9) {
                flashOctopus(i, j, nextMap, flashMap);
            }
        }
    }
    // Reset energies greater than 9 to 0
    return nextMap.map(row => row.map(value => value > 9 ? 0 : value));
}

const countFlashingOctopus = (octopusMap) => 
    octopusMap.reduce((total, row) => total + row.reduce((totalRow, current) => current === 0 ? totalRow + 1 : totalRow, 0), 0)

const TOTAL_STEPS = 100;
let currentStep = duplicateMap(dumpOctopus);
let totalFlashes = 0;
//console.log('Before any steps:');
//printMap(currentStep);
//console.log('');
for (let i = 0; i < TOTAL_STEPS; i++) {
    currentStep = addStep(currentStep);
    const flashingOctopus = countFlashingOctopus(currentStep);
    totalFlashes += flashingOctopus;
    // console.log(`Step ${i+1} flashing ${flashingOctopus}`)
    //console.log(`Step ${i + 1}`)
    //printMap(currentStep);
    //console.log('');

}

console.log('Total', totalFlashes);
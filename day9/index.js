const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day9/input.txt");

class Map {
    map = [[]];
    constructor(_map) {
        this.map = [..._map.map(row => [...row])];
        this.borders = { x: this.map.length, y: this.map[0].length };
    }

    getBorders() {
        return this.borders;
    }

    getTile(x, y) {
        if (x < 0 || y < 0 || x >= this.borders.x || y >= this.borders.y) {
            return Number.POSITIVE_INFINITY;
        }
        return this.map[x][y];
    }

    toString() {
        return this.map.map(row => row.join('')).join('\n');
    }

}

const heightMap = new Map(INPUT.map(row => row.split('').map(Number)));

const lowPoints = [];
const limits = heightMap.getBorders();
for (let x = 0; x < limits.x; x++) {
    for (let y = 0; y < limits.y; y++) {
        const point = heightMap.getTile(x, y);
        if (heightMap.getTile(x - 1, y) > point
            && heightMap.getTile(x + 1, y) > point
            && heightMap.getTile(x, y - 1) > point
            && heightMap.getTile(x, y + 1) > point) {
            lowPoints.push(point);
        }
    }
}

const riskLevel = lowPoints.map(value => value + 1).reduce((total, value) => total + value)

console.log(heightMap.toString());
console.log('points: ', lowPoints);
console.log('riskLevel', riskLevel);
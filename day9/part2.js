const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day9/input.txt");

class Map {
    map = [[]];
    constructor(_map) {
        this.map = [..._map.map(row => [...row])];
        this.borders = { x: this.map.length, y: this.map[0].length };
    }

    getMap() {
        return this.map;
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
    areAdjacentTilesBigger(x, y) {
        const value = heightMap.getTile(x, y);
        return heightMap.getTile(x, y - 1) > value
            && heightMap.getTile(x, y + 1) > value
            && heightMap.getTile(x + 1, y) > value
            && heightMap.getTile(x - 1, y) > value;
    }

}

const heightMap = new Map(INPUT.map(row => row.split('').map(Number)));

const lowPoints = [];
const limits = heightMap.getBorders();
for (let x = 0; x < limits.x; x++) {
    for (let y = 0; y < limits.y; y++) {
        const value = heightMap.getTile(x, y);
        if (heightMap.areAdjacentTilesBigger(x, y)) {
            lowPoints.push({ x, y, value });
        }
    }
}

const basinFinder = (map, x, y) => {
    const visitedMap = map.getMap().map(row => row.map(_ => false));

    const isVisited = (x, y) => {
        if (x < 0 || y < 0 || x >= visitedMap.length || y >= visitedMap[0].length) {
            return true;
        }
        return visitedMap[x][y];
    }
    const mark = (x, y) => {
        if (x < 0 || y < 0 || x >= visitedMap.length || y >= visitedMap[0].length) {
            return;
        }
        visitedMap[x][y] = true;
    }
    const calculateBasinLength = (x, y) => {
        if (x < 0 || y < 0 || x >= heightMap.getBorders().x || y >= heightMap.getBorders().y) {
            return 0;
        }
        let total = 0;
        if (!isVisited(x - 1, y) && heightMap.getTile(x - 1, y) !== 9) {
            mark(x - 1, y);
            total += (1 + calculateBasinLength(x - 1, y));
        }
        if (!isVisited(x + 1, y) && heightMap.getTile(x + 1, y) !== 9) {
            mark(x + 1, y);
            total += (1 + calculateBasinLength(x + 1, y));
        }
        if (!isVisited(x, y - 1) && heightMap.getTile(x, y - 1) !== 9) {
            mark(x, y - 1);
            total += (1 + calculateBasinLength(x, y - 1));
        }
        if (!isVisited(x, y + 1) && heightMap.getTile(x, y + 1) !== 9) {
            mark(x, y + 1);
            total += (1 + calculateBasinLength(x, y + 1));
        }
        return total;
    }
    mark(x,y);
    return 1 + calculateBasinLength(x, y, map.getTile(x, y));
}

const basins = lowPoints.map(point => basinFinder(heightMap, point.x, point.y))

const getMaxValues = (basinsArray) => basinsArray.sort((a,b) => b -a ).slice(0, 3);

const [max1, max2, max3] = getMaxValues(basins);

console.log('Max values', max1, max2, max3);
console.log('Multiplication', max1 * max2 * max3);
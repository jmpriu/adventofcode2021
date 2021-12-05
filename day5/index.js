const { readStringArrayFromFile } = require("../common");
const { Line, Point } = require("./Line");

const INPUT = readStringArrayFromFile("/day5/input.txt");

const getLines = (input) =>
    input.map(lineString => new Line(lineString));

const getBoundingBox = (lines = []) => {
    const start = new Point(0, 0);
    const end = new Point(0, 0);
    lines.forEach(line => {
        if (line.a.x > end.x) {
            end.x = line.a.x;
        }
        if (line.b.x > end.x) {
            end.x = line.b.x;
        }
        if (line.a.y > end.y) {
            end.y = line.a.y;
        }
        if (line.b.y > end.y) {
            end.y = line.b.y;
        }
    })
    return [start, end];
}

const printMap = (map) => {
    console.log('');
    console.log(
        map.map(row => 
            row.map(v => 
                    v === 0 ? '.' : v)
                .join('')
            ).join('\n'))
    console.log('');
}
const lines = getLines(INPUT);
const [start, end] = getBoundingBox(lines);

const map = new Array(end.y + 1).fill(null).map(_ => new Array(end.x + 1).fill(0));
lines.forEach(line => {
    const points = line.getPontsLineWithDiagonal();
    points.forEach(point => {
        map[point.y][point.x]++;
    })
})  
printMap(map);

let points = 0;
map.forEach(row => {
    row.forEach(cell => {
        if (cell > 1) {
            ++points;
        }
    })
})

console.log('POITNS:', points)
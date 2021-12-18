const { readStringArrayFromFile } = require("../common");

const rawPathsInput = readStringArrayFromFile("/day12/input.txt");
const posiblePaths = {};
rawPathsInput.map(paths => paths.split('-')).forEach(([start, end]) => {
    posiblePaths[start] = (posiblePaths[start] || []);
    posiblePaths[start].push(end);
    posiblePaths[end] = (posiblePaths[end] || []);
    posiblePaths[end].push(start);
})
Object.keys(posiblePaths).forEach((key) => {
    posiblePaths[key] = [...new Set([...posiblePaths[key]])]
})

console.log(posiblePaths);

const isNodeUpperCase = (string) => string === string.toUpperCase();

const solutions = [];
const findPaths = (currentNodes, node) => {
    if (node === 'end') {
        solutions.push([...currentNodes, node]);
    } else if (isNodeUpperCase(node) || !currentNodes.includes(node)) {
        posiblePaths[node].forEach(nextNode => {
            findPaths([...currentNodes, node], nextNode);
        })
    }
}
findPaths([], 'start');

console.log(solutions);
console.log(`Total solutions ${solutions.length}`)
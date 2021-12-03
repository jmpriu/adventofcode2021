const fs = require('fs');

const NEWLINE = `
`;

const readFile = (filename) => fs.readFileSync(filename, { encoding: "utf-8" });

const readNumberArrayFromFile = (filename) => 
    readFile(filename)
    .split(NEWLINE)
    .map(Number);

module.exports = {
    readFile,
    readNumberArrayFromFile
}
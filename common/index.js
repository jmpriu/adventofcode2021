const fs = require('fs');

const WINDOWS_NEWLINE = '\r\n';
const UNIX_NEWLINE = '\n';

const readFile = (filename) => fs.readFileSync(filename, { encoding: "utf-8" });

const splitStringWithNewLine = (text) => {
    if (text.indexOf(WINDOWS_NEWLINE >= 0)) {
        return text.split(WINDOWS_NEWLINE);
    }
    return text.split(UNIX_NEWLINE);
}

const readNumberArrayFromFile = (filename) => 
    splitStringWithNewLine(readFile(filename))
    .map(Number);

const readStringArrayFromFile = (filename) =>
    splitStringWithNewLine(readFile(filename));

module.exports = {
    readFile,
    readNumberArrayFromFile,
    readStringArrayFromFile
}
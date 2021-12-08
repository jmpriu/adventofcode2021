const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day8/input.txt");

const getUSPAndDigits = (inputLine) => {
    let [USP, digitsOutput] = inputLine.split(' | ');
    USP = USP.split(' ');
    digitsOutput = digitsOutput.split(' ');
    return [USP, digitsOutput];
}

const filterByLength = (digitSignal) => [2, 4, 3, 7].includes(digitSignal.length);

console.log(INPUT
    .map(inputLine => getUSPAndDigits(inputLine)[1])
    .reduce((total, digitsSignals) => total + digitsSignals.filter(filterByLength).length, 0));
const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day8/input.txt");
//                             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const DigitsRequiredSegments = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
const getUSPAndDigits = (inputLine) => {
    console.log(inputLine)
    let [USP, digitsOutput] = inputLine.split(' | ');
    USP = USP.split(' ');
    console.log(USP, digitsOutput);
    digitsOutput = digitsOutput.split(' ');
    return [USP, digitsOutput];
}
const filterByLength = (digitSignal) => [2, 4, 3, 7].includes(digitSignal.length);

console.log(INPUT.map(inputLine => getUSPAndDigits(inputLine)[1]).reduce((total, digitsSignals) => {
    return total + digitsSignals.filter(filterByLength).length;
}, 0));
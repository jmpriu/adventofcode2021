const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day8/input.txt");

const formatSetAsString = (set) => set.sort().join('');

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/
const getUSPAndDigits = (inputLine) => {
    let [USP, digitsOutput] = inputLine.split(' | ');
    USP = USP.split(' ').map(pattern => pattern.split(''));
    digitsOutput = digitsOutput.split(' ').map(digit => formatSetAsString(digit.split('')));
    return [USP, digitsOutput];
}

// A - B
const difference = (setA, setB) => setA.filter(s => !setB.includes(s))

// A U B U C
const union = (...args) => args.reduce((prev, curr) => [... new Set([...prev, ...curr])], []);

const containsAll = (segment, requiredSegments) => requiredSegments.every(value => segment.includes(value));

const decodeUSP = (uniqueSignalPatterns) => {
    const number_1 = uniqueSignalPatterns.find(digitPattern => digitPattern.length === 2);
    const number_4 = uniqueSignalPatterns.find(digitPattern => digitPattern.length === 4);
    const number_7 = uniqueSignalPatterns.find(digitPattern => digitPattern.length === 3);
    const number_8 = uniqueSignalPatterns.find(digitPattern => digitPattern.length === 7);

    const A = difference(number_7, number_1);

    const number_0_6_or_9 = uniqueSignalPatterns.filter(digitPattern => digitPattern.length === 6);

    const almost9 = union(number_4, number_7);
    const number_9 = number_0_6_or_9.find(candidate => containsAll(candidate, almost9));
    
    const E = difference(number_8, number_9);
    const G = difference(number_9, almost9);

    const number_0_or_6 = number_0_6_or_9.filter(digitPattern => !containsAll(digitPattern, number_9));
    const number_0 = number_0_or_6.find(candidate => containsAll(candidate, number_1));
    const number_6 = number_0_or_6.find(candidate => !containsAll(candidate, number_1));

    const C = difference(number_8, number_6);
    const F = difference(number_1, C);
    const D = difference(number_8, number_0);
    const number_2 = union(A, C, D, E, G)
    const number_3 = union(A, C, D, F, G);
    const B = difference(number_4, union(C, D, F));
    const number_5 = union(A, B, D, F, G);

    const numbers = [
        formatSetAsString(number_0),
        formatSetAsString(number_1),
        formatSetAsString(number_2),
        formatSetAsString(number_3),
        formatSetAsString(number_4),
        formatSetAsString(number_5),
        formatSetAsString(number_6),
        formatSetAsString(number_7),
        formatSetAsString(number_8),
        formatSetAsString(number_9),
    ];
    return numbers;
}

let outputSum = 0;
for (let i = 0; i < INPUT.length; i++) {
    const [USP, digits] = getUSPAndDigits(INPUT[i])
    const decodedDictionary = decodeUSP(USP);
    const decodedDigits = +digits.map(codedDigit => decodedDictionary.findIndex(d => d === codedDigit)).join('');
    console.log(`${digits.join(' ')}: ${decodedDigits}`)
    outputSum += decodedDigits;
}

console.log('OutputSUM', outputSum);

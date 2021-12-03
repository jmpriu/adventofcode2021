const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day3/input.txt");

console.log(INPUT);

const stringToBinary = (string) => parseInt(string, 2);

const getGammaAndEpsilonRate = (binaryNumbers) => {
    const numberOfBits = binaryNumbers[0].length;
    const BIT_COUNT = new Array(numberOfBits).fill(0);
    for (let i = 0; i < numberOfBits; i++) {
        binaryNumbers.forEach(number => {
            const bit = number[i];
            if (bit === '1') {
                BIT_COUNT[i]++;
            } else {
                BIT_COUNT[i]--;
            }
        });
    };
    const gamma = BIT_COUNT.map(value => value >= 0 ? '1' : '0').join('');
    const epsilon_rate = BIT_COUNT.map(value => value >= 0 ? '0' : '1').join('');
    return { gamma, epsilon_rate };
}


const { gamma: gammaResult, epsilon_rate: epsiloRateResult } = getGammaAndEpsilonRate(INPUT);
const gammaInt = stringToBinary(gammaResult);
const epsilonInt = stringToBinary(epsiloRateResult);
console.log(`
    PART 1:
    gamma: ${gammaResult} - ${gammaInt}
    epsilon_rate: ${epsiloRateResult} - ${epsilonInt}
    solution: ${gammaInt * epsilonInt}
`)

// PART 2
const getCandidate = (candidates, prop = 'gamma', positionToCheck = 0) => {
    if (!['gamma', 'epsilon_rate'].includes(propToCheck)) {
        console.error('Posibles values of the second parameter are gamma or epsilon_rate');
    }
    if (candidates.length === 1) {
        return candidates[0];
    } else if (candidates.length === 0 || candidates[0].length < positionToCheck) {
        return null;
    }
    const parameterArray = getGammaAndEpsilonRate(candidates)[prop];
    return getCandidate(
        candidates
            .filter(candidate => candidate[positionToCheck] === parameterArray[positionToCheck]),
        prop,
        positionToCheck + 1
    )
}

const oxigenCandidate = getCandidate(INPUT, 'gamma');
const oxigenCandidateInt = stringToBinary(oxigenCandidate);
const co2Candidate = getCandidate(INPUT, 'epsilon_rate');
const co2CandidateInt = stringToBinary(co2Candidate);
console.log(`
    PART 2:
    oxigen: ${oxigenCandidate} - ${oxigenCandidateInt}
    co2: ${co2Candidate} - ${co2CandidateInt}
    solution: ${oxigenCandidateInt * co2CandidateInt}
`);
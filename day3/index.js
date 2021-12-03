const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("./input.txt");

console.log(INPUT);

const getGammaAndEpsilonRate = (binaryNumbers) => {
    const numberOfBits = binaryNumbers[0].length;
    const BIT_COUNT = new Array(numberOfBits).fill(0);
    for (let i = 0; i < numberOfBits; i++){
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
    return [gamma, epsilon_rate];
}

const stringToBinary = (string) => parseInt(string, 2);

const [gammaResult, epsiloRateResult ] = getGammaAndEpsilonRate(INPUT);
const gammaInt = stringToBinary(gammaResult);
const epsilonInt = stringToBinary(epsiloRateResult);
console.log(`
    PART 1:
    gamma: ${gammaResult} - ${gammaInt}
    epsilon_rate: ${epsiloRateResult} - ${epsilonInt}
    solution: ${gammaInt * epsilonInt}
`)

let OXYGEN_CANDIDATES = [...INPUT];
for (let i = 0; i < OXYGEN_CANDIDATES[0].length; i++) {
    const [gamma, ] = getGammaAndEpsilonRate(OXYGEN_CANDIDATES);
    OXYGEN_CANDIDATES = OXYGEN_CANDIDATES.filter(candidate => candidate[i] === gamma[i]);
    if (OXYGEN_CANDIDATES.length === 1) {
        break;
    }
}

let CO2_SCRUBBER_CANDIDATES = [...INPUT];
for (let i = 0; i < CO2_SCRUBBER_CANDIDATES[0].length; i++) {
    const [, epsilon] = getGammaAndEpsilonRate(CO2_SCRUBBER_CANDIDATES);
    CO2_SCRUBBER_CANDIDATES = CO2_SCRUBBER_CANDIDATES.filter(candidate => candidate[i] === epsilon[i]);
    if (CO2_SCRUBBER_CANDIDATES.length === 1) {
        break;
    }
}

const oxigenCandidate = OXYGEN_CANDIDATES[0];
const oxigenCandidateInt = stringToBinary(oxigenCandidate);
const co2Candidate = CO2_SCRUBBER_CANDIDATES[0];
const co2CandidateInt = stringToBinary(co2Candidate);
console.log(`
    PART 2:
    oxigen: ${oxigenCandidate} - ${oxigenCandidateInt}
    co2: ${co2Candidate} - ${co2CandidateInt}
    solution: ${oxigenCandidateInt * co2CandidateInt}
`);
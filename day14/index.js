const { readStringArrayFromFile } = require("../common");

const rawInstructionsInput = readStringArrayFromFile("/day14/input.txt");

const processInstructions = (instructionsArray) => {
    const polymer = instructionsArray[0];
    const insertionRules = [];
    for (let i = 2; i < instructionsArray.length; i++) {
        insertionRules.push(instructionsArray[i].split(' -> '));
    }
    return [polymer, insertionRules];
}

const [polymer, rules] = processInstructions(rawInstructionsInput);


let pairs = {};
let characters = {};
for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];
    pairs[pair] = (pairs[pair] || 0) + 1;
}
for (let i = 0; i < polymer.length; i++) {
    characters[polymer[i]] = (characters[polymer[i]] || 0) + 1;
}

const nextStep = (pairs, characters) => {
    const newPairs = { ...pairs };
    const newCharacters = { ...characters };
    for (let i = 0; i < rules.length; i++) {
        const [[a, b], produce] = rules[i];
        if (pairs[a + b]) {
            const pairA = a + produce;
            const pairB = produce + b;
            newPairs[pairA] = (newPairs[pairA] || 0) + pairs[a + b];
            newPairs[pairB] = (newPairs[pairB] || 0) + pairs[a + b];
            newPairs[a + b] =  newPairs[a + b] - pairs[a + b];
            newCharacters[produce] = (newCharacters[produce] || 0) + pairs[a + b];
        }
    }

    return { pairs: newPairs, characters: newCharacters }
}

const STEPS = 40;
for (let i = 0; i < STEPS; i++) {
    const result = nextStep(pairs, characters);
    pairs = result.pairs;
    characters = result.characters;
}
console.log(pairs, characters);

const counts = Object.values(characters);

console.log(Math.max(...counts) - Math.min(...counts));

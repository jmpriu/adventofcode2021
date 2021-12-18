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

const nextStep = (polymer) => {
    let newPolymer = polymer;
    let i = 0;
    while (i < newPolymer.length - 1) {
        let ruleApply = false;
        for (let j = 0; !ruleApply && j < rules.length; j++) {
            if (newPolymer[i] === rules[j][0][0] && newPolymer[i + 1] === rules[j][0][1]) {
                ruleApply = true;
                newPolymer = newPolymer.slice(0, i + 1) + rules[j][1].toLowerCase() + newPolymer.slice(i + 1);
            }
        }
        i++;
    }
    return newPolymer.toUpperCase();
}

const STEPS = 10;
let generation = polymer;
console.log(`Template: ${generation}`)
for (let i = 0; i < STEPS; i++) {
    console.log(i, generation.length);
    generation = nextStep(generation);
}

const atoms = [...new Set([...generation])];

const countAtomInString = (atom, string) => (string.match(new RegExp(atom, "g")) || []).length;
const total = atoms.map(a => countAtomInString(a, generation));
console.log(atoms);
console.log(total);
console.log('Result', Math.max(...total) - Math.min(...total));
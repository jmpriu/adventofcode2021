const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day6/input.txt");

let lanternFishes = INPUT[0].split(',').map(Number);

const NEW_FISH = 8;
const MOTHER_FISH = 6;
const REMAINING_DAYS = 256;

const calculateChildrens = (remainingDays, daysNeeded) => {
    if (remainingDays > daysNeeded) {
        return 1
            + calculateChildrens(remainingDays - daysNeeded, MOTHER_FISH + 1)
            + calculateChildrens(remainingDays - daysNeeded, NEW_FISH + 1);
    }
    return 0;
}

const FISH_MAP = lanternFishes.reduce((map, fish) => ({
    ...map,
    [fish]: (map[fish] || 0) + 1
}), {});

let total = 0;
Object.entries(FISH_MAP).map(([days, ammount]) => {
    console.time(`Map${days}`);
    total += ammount * (1 + calculateChildrens(REMAINING_DAYS, +days));
    console.timeEnd(`Map${days}`);
});

//const result = lanternFishes.map(Number).map(fishDays => 1 + calculateChildrens(REMAINING_DAYS, fishDays))
console.log('Total', total)
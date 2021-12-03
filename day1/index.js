const { readNumberArrayFromFile } = require("../common");

const INPUT = readNumberArrayFromFile("./example.txt");

const countIncrements = (numbers) => {
    let increments = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i+1] > numbers[i]) {
            increments++;
        }
    }
    return increments;
}


console.log('SOLUTION PART 1:', countIncrements(INPUT));

const threeMeasurementsInput = INPUT.reduce((resultArray, _, currentIndex, originalArray) => {
    if(currentIndex < originalArray.length - 2) {
        resultArray.push(originalArray[currentIndex] + originalArray[currentIndex + 1] + originalArray[currentIndex + 2]);
    }
    return resultArray;
}, []);

console.log('SOLUTION PART 2:', countIncrements(threeMeasurementsInput));
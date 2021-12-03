const { readStringArrayFromFile } = require("../common");

const INPUT = readStringArrayFromFile("/day2/input.txt");

console.log(INPUT);

const executeCommands = (commandList) => {
    let position = 0;
    let depth = 0;
    commandList
        .map(command => command
        .split(' '))
        .map(([action, number]) => [action, Number(number)])
        // "command X" -> ["command", X]
        .forEach(([action, number]) => {
            switch(action) {
                case "forward":
                    position = position + number;
                    break;
                case "down":
                    depth = depth + number;
                    break;
                case "up":
                    depth = depth - number;
                    break;
                default:
                    console.log("Can't execute", command, number);
            }
        });
    return { position, depth };
}

const executeCommandsPart2 = (commandList) => {
    let position = 0;
    let depth = 0;
    let aim = 0;
    commandList
        .map(command => command
        .split(' '))
        .map(([action, number]) => [action, Number(number)])
        // "command X" -> ["command", X]
        .forEach(([action, number]) => {
            switch(action) {
                case "forward":
                    position = position + number;
                    depth = depth + aim * number;
                    break;
                case "down":
                    aim = aim + number;
                    break;
                case "up":
                    aim = aim - number;
                    break;
                default:
                    console.log("Can't execute", command, number);
            }
        });
    return { position, depth };
}

const { position, depth } = executeCommands(INPUT);

console.log(`
    PART 1
    position:${position}
    depth: ${depth}
    multiplication: ${position * depth}
`)

const { position: postionPart2, depth:depthPart2 } = executeCommandsPart2(INPUT);

console.log(`
    PART 2
    position:${postionPart2}
    depth: ${depthPart2}
    multiplication: ${postionPart2 * depthPart2}
`)


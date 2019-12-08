const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0]

/*
    structure of code
        function: execute the 4 digit change
        function: recursively work through array in chunks of 4
*/

function modifyArray(inputArray, index){
    let destination = inputArray[index+3]
    let value1 = inputArray[inputArray[index+1]]
    let value2 = inputArray[inputArray[index+2]]
    let operation = inputArray[index]

    if (operation == 1) {
        inputArray[destination] = value1 + value2
    }
    else if (operation == 2) {
        inputArray[destination] = value1 * value2
    }
    else{
        console.log(`invalid operator at index ${index}`)
    }
}

function fixIntCode(inputArray, index) {
    let newIndex
    if (inputArray[index] == 99) {
        return inputArray[0]
    }
    else if (index > inputArray.length - 5){
        return inputArray[0]
    }
    else {
        modifyArray(inputArray, index)
        return fixIntCode(inputArray, index + 4)
    }
}

function findProperCoordinates() {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            let freshInput = [...input]
            freshInput[1] = noun
            freshInput[2] = verb
            let answer = fixIntCode(freshInput, 0)
            if (answer == 19690720){
                return 100 * noun + verb
            }
        }
    }
}

console.log(findProperCoordinates())
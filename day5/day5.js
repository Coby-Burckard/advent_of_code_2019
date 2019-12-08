const prompt = require('prompt')
const readline = require('readline-sync')

function decompressOpp(opcode, index) {
    return opcode.toString().split('')
}

function implement12(inputArray, index, parameters, opcode) {
    let destination = inputArray[index+3]
    let operation = opcode
    let value1
    let value2
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1]  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1] 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : inputArray[index+2]
    }

    if (operation == '1') {
        // console.log(`implementing add. Changing destination ${destination} to ${value1 + value2} for value1 = ${value1}  value 2 = ${value2}`)
        inputArray[destination] = value1 + value2
    }
    else if (operation == '2') {
        // console.log(`implementing multiply. param values ${parameters}. Changing destination ${destination} to ${value1 * value2} for value1 = ${value1}  value 2 = ${value2}`)
        // console.log(inputArray[95])
        inputArray[destination] = value1 * value2
    }
    else {
        console.log(`invalid operator at index ${index}`)
    }
}

async function implement3(inputArray, index) {
    const destination = inputArray[index + 1]
    let userInput = parseInt(readline.question('input: '))
    inputArray[destination] = userInput
}

function implement4(inputArray, index, parameters) {
    let value1 = 0
    if (parameters.length == 0){
        value1 = inputArray[inputArray[index+1]]
    }
    else {
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1] 
    }
    console.log(value1)
}

function implement5(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1]  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1] 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : inputArray[index+2]
    }
    console.log(`value1 = ${value1} value2=${value2}, setting index to ${(value1 != 0) ? value2 : index + 3}`)
    return (value1 != 0) ? value2 : index+=3
}

function implement6(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1]  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1] 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : inputArray[index+2]
    }
    console.log(`setting index to ${(value1 == 0) ? value2 : index + 3}`)
    return (value1 == 0) ? value2 : index+=3
}

function implement7(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    destination = inputArray[index+3]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1]  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1] 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : inputArray[index+2]
    }
    console.log(`value1 ${value1}, value2 ${value2}, value1 < value2 ${value1<value2}... index ${destination} set to ${(value1 < value2) ? 1 : 0}`)
    inputArray[destination] = (value1 < value2) ? 1 : 0
}

function implement8(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    destination = inputArray[index+3]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1]  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : inputArray[index+1] 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : inputArray[index+2]
    }
    console.log(`value1 ${value1}, value2 ${value2}, value1 == value2 ${value1==value2}... index ${destination} set to ${(value1 == value2) ? 1 : 0}`)
    inputArray[destination] = (value1 == value2) ? 1 : 0
}

function implementOpp(inputArray, index) {
    let instruction = decompressOpp(inputArray[index], index)
    let opcode = instruction[instruction.length - 1]
    let newIndex
    console.log(`index = ${index}, instruction = ${instruction}, opcode = ${opcode}`)
    if (opcode == '1' || opcode == '2') {
        implement12(inputArray, index, instruction.slice(0, instruction.length - 2).reverse(), opcode)
        newIndex = index + 4
    }
    else if (opcode == '3'){
        implement3(inputArray, index)
        newIndex = index + 2
    }
    else if (opcode == '4'){
        implement4(inputArray, index, instruction.slice(0, instruction.length - 2).reverse())
        newIndex = index + 2
    }
    else if (opcode == '5'){
        newIndex = implement5(inputArray, index, instruction.slice(0, instruction.length - 2).reverse())
    }
    else if (opcode == '6'){
        newIndex = implement6(inputArray, index, instruction.slice(0, instruction.length - 2).reverse())
    }
    else if (opcode == '7'){
        implement7(inputArray, index, instruction.slice(0, instruction.length - 2).reverse())
        newIndex = index + 4
    }
    else if (opcode == '8'){
        implement8(inputArray, index, instruction.slice(0, instruction.length - 2).reverse())
        newIndex = index + 4
    }
    else if (opcode == '9') {
        return 'computation complete ' + inputArray[0]
    }
    else {
        return `incorrect opcode at index ${index}`
    }
    
    return implementOpp(inputArray, newIndex)
}

// const input = [1002,4,3,4,33]

let input = [3,225,1,225,6,6,1100,1,238,225,104,0,1102,17,65,225,102,21,95,224,1001,224,-1869,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,101,43,14,224,1001,224,-108,224,4,224,102,8,223,223,101,2,224,224,1,223,224,223,1101,57,94,225,1101,57,67,225,1,217,66,224,101,-141,224,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,1102,64,34,225,1101,89,59,225,1102,58,94,225,1002,125,27,224,101,-2106,224,224,4,224,102,8,223,223,1001,224,5,224,1,224,223,223,1102,78,65,225,1001,91,63,224,101,-127,224,224,4,224,102,8,223,223,1001,224,3,224,1,223,224,223,1102,7,19,224,1001,224,-133,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,2,61,100,224,101,-5358,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,19,55,224,101,-74,224,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,1101,74,68,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,107,677,677,224,102,2,223,223,1006,224,329,1001,223,1,223,1008,226,677,224,102,2,223,223,1006,224,344,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,359,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,374,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,389,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,404,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1108,226,677,224,102,2,223,223,1006,224,434,101,1,223,223,1108,677,677,224,1002,223,2,223,1005,224,449,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,464,101,1,223,223,7,677,226,224,1002,223,2,223,1006,224,479,101,1,223,223,108,677,677,224,1002,223,2,223,1005,224,494,101,1,223,223,107,226,677,224,1002,223,2,223,1006,224,509,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,524,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,539,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,554,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,569,101,1,223,223,1007,677,677,224,102,2,223,223,1005,224,584,1001,223,1,223,1107,677,226,224,1002,223,2,223,1006,224,599,101,1,223,223,7,226,226,224,1002,223,2,223,1005,224,614,101,1,223,223,108,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,108,226,226,224,1002,223,2,223,1005,224,644,101,1,223,223,1007,677,226,224,1002,223,2,223,1006,224,659,101,1,223,223,1107,226,226,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226]
// console.log(input[95])

// input = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
//[3,12,6,12,15,1,13,14,13,4,13,99,1,0,1,9]
// console.log(newinput)
console.log(implementOpp(input, 0))

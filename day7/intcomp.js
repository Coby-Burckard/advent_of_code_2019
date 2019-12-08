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

async function implement3(inputArray, index, userInputs) {
    const destination = inputArray[index + 1]
    let userInput = userInputs.splice(0,1)[0]
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
    // console.log(`value1 = ${value1} value2=${value2}, setting index to ${(value1 != 0) ? value2 : index + 3}`)
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
    // console.log(`setting index to ${(value1 == 0) ? value2 : index + 3}`)
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
    // console.log(`value1 ${value1}, value2 ${value2}, value1 < value2 ${value1<value2}... index ${destination} set to ${(value1 < value2) ? 1 : 0}`)
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
    // console.log(`value1 ${value1}, value2 ${value2}, value1 == value2 ${value1==value2}... index ${destination} set to ${(value1 == value2) ? 1 : 0}`)
    inputArray[destination] = (value1 == value2) ? 1 : 0
}

function implementOpp(inputArray, index, userInputs) {
    let instruction = decompressOpp(inputArray[index], index)
    let opcode = instruction[instruction.length - 1]
    let newIndex
    // console.log(`index = ${index}, instruction = ${instruction}, opcode = ${opcode}`)
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
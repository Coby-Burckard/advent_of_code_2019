const fs = require('fs')
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
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : (parameters[0] == 1) ? inputArray[index+2] : relativeBase + value1
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

function implement3(inputArray, index, userInputs) {
    const destination = inputArray[index + 1]
    let userInput = userInputs.splice(0,1)
    inputArray[destination] = userInput[0]
    // console.log(`storing ${userInput} at ${destination}`)
}

function implement4(inputArray, index, parameters) {
    let value1 = 0
    if (parameters.length == 0){
        value1 = inputArray[inputArray[index+1]]
    }
    else {
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1 
    }
    // console.log(`outputing values index = ${index+2}, value = ${value1}`)
    return [index+2, value1]
}

function implement5(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : (parameters[0] == 1) ? inputArray[index+2] : relativeBase + value1
    }
    // console.log(`value1 = ${value1} value2=${value2}, setting index to ${(value1 != 0) ? value2 : index + 3}`)
    return (value1 != 0) ? value2 : index+=3
}

function implement6(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : (parameters[0] == 1) ? inputArray[index+2] : relativeBase + value1
    }
    // console.log(`setting index to ${(value1 == 0) ? value2 : index + 3}`)
    return (value1 == 0) ? value2 : index+=3
}

function implement7(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    destination = inputArray[index+3]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : (parameters[0] == 1) ? inputArray[index+2] : relativeBase + value1
    }
    // console.log(`value1 ${value1}, value2 ${value2}, value1 < value2 ${value1<value2}... index ${destination} set to ${(value1 < value2) ? 1 : 0}`)
    inputArray[destination] = (value1 < value2) ? 1 : 0
}

function implement8(inputArray, index, parameters){
    value1 = inputArray[inputArray[index+1]]
    value2 = inputArray[inputArray[index+2]]
    destination = inputArray[index+3]
    if (parameters.length == 1){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1  
    }
    else if (parameters.length >= 2){
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1 
        value2 = (parameters[1] == 0) ? inputArray[inputArray[index+2]] : (parameters[0] == 1) ? inputArray[index+2] : relativeBase + value1
    }
    // console.log(`value1 ${value1}, value2 ${value2}, value1 == value2 ${value1==value2}... index ${destination} set to ${(value1 == value2) ? 1 : 0}`)
    inputArray[destination] = (value1 == value2) ? 1 : 0
}

function implement9(inputArray, index, parameters, relativeBase){
    if (parameters.length == 0){
        value1 = inputArray[inputArray[index+1]]
    }
    else {
        value1 = (parameters[0] == 0) ? inputArray[inputArray[index+1]] : (parameters[0] == 1) ? inputArray[index+1] : relativeBase + value1
    }
    return relativeBase + value1
}

function implementOpp(inputArray, index, quackquack, relativeBase) {
    let instruction = decompressOpp(inputArray[index], index)
    let opcode = (instruction.slice(instruction.length-2).join() == '99') ? '99' : instruction[instruction.length - 1]
    let newIndex
    // console.log(`index = ${index}, instruction = ${instruction}, opcode = ${opcode}`)
    if (opcode == '1' || opcode == '2') {
        implement12(inputArray, index, instruction.slice(0, instruction.length - 2).reverse(), opcode)
        newIndex = index + 4
    }
    else if (opcode == '3'){
        implement3(inputArray, index, quackquack)
        newIndex = index + 2
    }
    else if (opcode == '4'){
        return implement4(inputArray, index, instruction.slice(0, instruction.length - 2).reverse())
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
        relativeBase = implement9(inputArray, index, instruction.slice(0, instruction.length - 2).reverse(), relativeBase)
        newIndex = index + 2
    }
    else if (opcode == '99') {
        console.log('shutting down')
        return [index, 'goodbye']
    }
    else {
        return `incorrect opcode at index ${index}`
    }
    
    return implementOpp(inputArray, newIndex, quackquack, relativeBase)
}



// permutation function taken from stack overflow
function permutator(inputArr) {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
}
// part one
// function findAmpOutput(phaseSettings, ampInput, intCompInput){
//     //recursively finds the amp output by moving through the phasesettings and ampInputs
//     // console.log('phasesettings = ' + phaseSettings + ' ps.length = ' + phaseSettings.length)
//     //base case = when out of phaseSettings
//     if (phaseSettings.length < 1){
//         // console.log('ending recursion with ampInput = ' + ampInput)
//         return ampInput
//     }
    
//     const freshIntCompInput = [...intCompInput]

//     const phaseSetting = phaseSettings.splice(0,1)
//     let compUserInputs = [...phaseSetting, ampInput]
//     const ampOutput = implementOpp(freshIntCompInput, ampInput[0], compUserInputs)
//     return findAmpOutput(phaseSettings, ampOutput, intCompInput)
// }

/*
Part 2 modifications
    0. instructions are no longer run on frest copies after they output
    1. a 4 instruction now outputs the index + 2 along with the required output
    2. if the output from amp E is a 99, use previous E code
*/

function feedBackAmpOutput(permutation, instructionsList, ampsN){
    // runs the 5 amp feedback loop until e outputs a 99 code
    const ampsInstructions = []
    const ampOutputs = []
    const ampIndicies = []
    const ampInputs = []
    for(let i = 0; i < ampsN; i++){
        ampsInstructions.push([...instructionsList])
        ampInputs.push([permutation[i], 0])
        ampOutputs.push([])
        ampIndicies.push(0)
    }
    let ampIndex = 0
    let loopcounter = 0
    while (true) {
        nextAmp = (ampIndex + 1) % 5
        /*
            run amp with own input ints, index, and input
            store own index, and output
        */
        // console.log(`amp ${ampIndex} was fed index = ${ampIndicies[ampIndex]} and input = ${ampInputs[ampIndex]}`)
        ampOutputs[ampIndex] = implementOpp(ampsInstructions[ampIndex], ampIndicies[ampIndex], ampInputs[ampIndex])
        ampIndicies[ampIndex] = ampOutputs[ampIndex][0]
        // console.log(`amp ${ampIndex} returned ${ampOutputs[ampIndex]}`)
        /*
          If the output from the previous run is 'goodbye', return the last value outputted by amp 4
        */
        if (ampOutputs[ampIndex][1] == 'goodbye'){
          return ampInputs[0][0]
        }
       
        /*
        if this is the first time through the loop, the amp input for the next amp should be updated with the correct perm
        else, the input is the output of the previous amp
        */
       if (loopcounter < 4) {
        ampInputs[nextAmp][1] = ampOutputs[ampIndex][1]
        loopcounter++
       }
       else {
        ampInputs[nextAmp] = [ampOutputs[ampIndex][1]]
       }

       ampIndex = nextAmp
    }

}


function findMaxThrust(compIn) {
    const perms = permutator([5,6,7,8,9])
    let maxThrust = 0
    let maxPerm

    for (let i = 0; i < perms.length; i++){
        let perm = [...perms[i]]
        let thrust = feedBackAmpOutput(perm, compIn, 5)
        console.log(perm + ' ' + thrust)
        if (thrust > maxThrust){
            maxThrust = thrust
            maxPerm = [...perms[i]]
        }
    }
    
    return('perm: ' + maxPerm.join('') + ' thrust = ' + maxThrust)
}


const test1 = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
const test2 = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26, 27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
const compIn = [3,8,1001,8,10,8,105,1,0,0,21,38,55,64,89,114,195,276,357,438,99999,3,9,101,3,9,9,102,3,9,9,1001,9,5,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1002,9,4,9,101,5,9,9,1002,9,5,9,101,5,9,9,102,3,9,9,4,9,99,3,9,101,3,9,9,1002,9,4,9,101,5,9,9,102,5,9,9,1001,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99]
// 895746


console.log(findMaxThrust(compIn))
// console.log(feedBackAmpOutput([9,8,7,6,5], test2, 5))
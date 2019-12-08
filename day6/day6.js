/*
Advent of code day 6 plan
  1. function to parse instruction and build array of orbits
          a. function to add new body and it's orbit
            each new righthand body will check if left hand body exists
              if so, push lefthand value onto copy of lefthand ordbits and set new key == righthand
              if not, construct new array with lefthand as index 0 and righthand as key
  2. function to sum lengths of each key's array  
*/

function addNewBody(orbitPairString, orbitDict) {
  let orbitPair = orbitPairString.split(')')
  let centerBody = orbitPair[0].toString()
  let orbitBody = orbitPair[1].toString()
  orbitDict[orbitBody] = [centerBody]
  
}

function generateOrbitDict(orbitPairStrings) {
/*
  takes an array of orbit pair strings and generates the orbit dictionary
*/
  const orbitDict = {}
  orbitPairStrings.forEach(ops => addNewBody(ops, orbitDict))
  return orbitDict
}


function orbitCountChecksums (orbitDict) {
  /*
    Takes in an object of orbitArrays and counts the total length of all orbits arrays
  */
  orbitBodies = Object.keys(orbitDict)
  let checksum = 0
  for (let i = 0; i < orbitBodies.length; i++){
    checksum += orbitDict[orbitBodies[i]].length
  }
  return checksum
}


function readFileAndGetDict(textFile) {
  // reads in a text file of orbits separated by \n and returns an array of the orbit strings
  const fs = require('fs')
  const orbStrings = fs.readFileSync(textFile).toString().split('\n')
  const splitOrbs = orbStrings.map(orb => {
    return orb.replace(/\r/ ,'')
  })
  return generateOrbitDict(splitOrbs)
}


function findOrbitingBodies(centerBody, orbDict) {
  const orbitingBodies = []
  const allOrbs = Object.keys(orbDict)
  for (let i = 0; i < allOrbs.length; i++){
    let cent = orbDict[allOrbs[i]]
    if (cent == centerBody){
      orbitingBodies.push(allOrbs[i])
    }
  }
  return orbitingBodies
}


function buildOrbitBranch(orbDict, branchDict, currentBranch){
  //recursive function to build a branch of an orbit tree and adds it to the branch dict
  centerBody = currentBranch[currentBranch.length - 1]
  orbitingBodies = findOrbitingBodies(centerBody, orbDict)
  if (orbitingBodies.length > 0) {
    orbitingBodies.forEach(orbBody => {
      branchDict[orbBody] = [...currentBranch]
      currentBranch.push(orbBody)
      buildOrbitBranch(orbDict, branchDict, currentBranch)
      currentBranch.pop()
    })
  }
}


function findIntersection(youBranch, santaBranch) {
  let intersection
  for (let i=0; i<youBranch.length; i++) {
    for (let j=0; j<youBranch.length; j++) {
      let you = youBranch[i]
      let santa = santaBranch[j]
      if (you == santa) {intersection = [i, j]}
    }
  }
  return intersection
}


function jumpsToSanta(orbDict, branchDict){
  santaBranch = branchDict['SAN']
  youBranch = branchDict['YOU']
  
  splitPointIndicies = findIntersection(santaBranch, youBranch) //[you, santa] are the indicies
  youSplitBranch = youBranch.slice(splitPointIndicies[0])
  santaSplitBranch = santaBranch.slice(splitPointIndicies[1])
  
  console.log(youSplitBranch.length + santaSplitBranch.length - 2)
}

const orbDict = readFileAndGetDict('test.txt')
const branchDict = {}
const currentBranch = ['COM']
buildOrbitBranch(orbDict, branchDict, currentBranch)
console.log(branchDict)
console.log(orbDict)

// Part1 
console.log(orbitCountChecksums(branchDict))

// Part2
jumpsToSanta(orbDict, branchDict)
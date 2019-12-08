//reading input from file
const fs = require('fs');

let dir1 = fs.readFileSync('input1.txt', 'utf-8').split(',')
let dir2 = fs.readFileSync('input2.txt', 'utf-8').split(',')

// check if two coordinates are equal

function equalCoord (a, b) {
  return (a[0] == b[0] && a[1] == b[1]) ? true : false 
}

// function to calculate ManhattanDistance

function manhattanDistance(coord) {
  console.log(coord)
  return Math.abs(coord[0]) + Math.abs(coord[1])
}

// function to find intersections between the two wires.  Returns an array of intersecting points

function findOptimalIntersection(wire1, wire2){
  let optimalCoor = null
  const stepsToIntersections = []
  for (let i = 1; i < wire1.length; i++) {
    for (let j = 1; j < wire2.length; j++){
      if (equalCoord(wire1[i], wire2[j])){
        // This is for part 1
        // if (!optimalCoor) {
        //   optimalCoor = wire1[i]
        // }
        // else if (manhattanDistance(optimalCoor) > manhattanDistance(wire1[i])){
        //   optimalCoor = wire1[i]
        // }
        
        // part 2
        console.log(i + j)
        stepsToIntersections.push(i + j)
      }
    }
  }
  // if (!optimalCoor) {return 'no intersection'}
  return stepsToIntersections.sort((a, b) => a > b)
}


// function to build all wire coord

function buildWire(directionsArray){
  let wire = [[0,0]]
  directionsArray.forEach(direction => {
    wire = buildDirection(direction, wire)
  })
  return wire
}


// function to parse and build the wire coordinates based on given direction

function buildDirection(dirString, inputArray) {
  const direction = dirString[0]
  const magnitude = dirString.slice(1)
  let previousPosition = inputArray[inputArray.length - 1]

  const newPositions = [...inputArray]

  if (direction == 'R') {
    for (let i = 1; i <= magnitude; i++){
      let newPosition = [previousPosition[0] + 1, previousPosition[1]]
      newPositions.push(newPosition)
      previousPosition = newPosition
    }
  }
  else if (direction == 'L'){
    for (let i = 1; i <= magnitude; i++){
      let newPosition = [previousPosition[0] - 1, previousPosition[1]]
      newPositions.push(newPosition)
      previousPosition = newPosition
    }
  }
  else if (direction == 'U'){
    for (let i = 1; i <= magnitude; i++){
      let newPosition = [previousPosition[0], previousPosition[1] + 1]
      newPositions.push(newPosition)
      previousPosition = newPosition
    }
  }
  else if (direction == 'D'){
    for (let i = 1; i <= magnitude; i++){
      let newPosition = [previousPosition[0], previousPosition[1] - 1]
      newPositions.push(newPosition)
      previousPosition = newPosition
    }
  }
  else {
    console.log(`error: direction given as ${direction}`)
  }

  return newPositions
}  

function putItAllTogether (wire1Dir, wire2Dir) {
  const wire1 = buildWire(wire1Dir)
  const wire2 = buildWire(wire2Dir)
  return findOptimalIntersection(wire1, wire2)
}

// dir1 = ['R75','D30','R83','U83','L12','D49','R71','U7','L72']
// dir2 = ['U62','R66','U55','R34','D71','R55','D58','R83']

// // dir1 = ['R8','U5','L5','D3']
// // dir2 = ['U7','R6','D4','L4']

console.log(putItAllTogether(dir1, dir2))
const fs = require('fs')

function readInAstroids(textFile){
    const astroids = []
    const space = fs.readFileSync(textFile).toString().split('\n').map(row => row.replace(/\r/, ''))

    for(let column=0; column<space[0].length; column++){
        for (let row=0; row<space.length; row++){
            let location = space[row][column]
            location == '#' ? astroids.push([column, row]) : ''
        }
    }

    return astroids
}

function countVisibleAstroids(x, y, astroids){
    console.log(`point = [${x}, ${y}]`)
    const visibleAstroids = new Set([]) 
    
    astroids.forEach(astroid => {
        ax = astroid[0]
        ay = astroid[1]
        console.log(`checking to see if ${[ax,ay]} is visible`)
        if (!(x == ax && y == ay)){
            console.log(`not identical match`)
            xdist = ax-x
            ydist = ay-y
            xAbs = xdist == 0 ? 0 : xdist/Math.abs(xdist)
            yAbs = ydist == 0 ? 0 : ydist/Math.abs(ydist)
            slope = (ydist/xdist).toFixed(2)
            
            let quadrent
            if (xAbs >= 0 && yAbs >= 0) {
                quadrent = 1
            }
            else if (xAbs >= 0 && yAbs < 0) {
                quadrent = 2
            }
            else if (xAbs <= 0 && yAbs <= 0) {
                quadrent = 3
            }
            else {
                quadrent = 4
            }
            
            visibleAstroids.add(slope + quadrent.toString())
        }
    })
    return visibleAstroids.size
}

function findOptimalAstroid(textFile){
    const astroids = readInAstroids(textFile)
    let maxAstroid = []
    let maxVisible = 0
    astroids.forEach(astroid => {
        visible = countVisibleAstroids(astroid[0], astroid[1], astroids)
        if (visible > maxVisible) {
            maxAstroid = astroid
            maxVisible = visible
        }
    })
    return `maximum visible = ${maxVisible} at astroid ${maxAstroid}`
}

const input = 'day10.txt'
const test1 = 'test.txt'
const test2 = 'test2.txt'

// console.log(findOptimalAstroid(input))


//part 2
function destroyOrder(x, y, astroids){
    console.log(`point = [${x}, ${y}]`)
    const visibleAstroids = {}
    
    astroids.forEach(astroid => {
        ax = astroid[0]
        ay = astroid[1]
        if (!(x == ax && y == ay)){
            xdist = ax-x
            ydist = y-ay
            preAngle = Math.atan(xdist/ydist)
            angle = (ydist < 0) ? preAngle + Math.PI : (xdist < 0) ? preAngle + 2 * Math.PI : preAngle
            let newPoint = [ax,ay]
            let newDist = distance(xdist, ydist)
            let newAngle = angle
            let newX = ax
            let newY = ay
            let lowDistance
            let lowPoint

            if (newAngle.toFixed(4) in visibleAstroids){
                while(newAngle.toFixed(4) in visibleAstroids){
                    existingAstroid = [...visibleAstroids[newAngle.toFixed(4)]]
                    astroidPosition = [...existingAstroid[1]]
                    existingX = astroidPosition[0]
                    existingY = astroidPosition[1]
                    newX = newPoint[0]
                    newY = newPoint[1]
                    newAngle = parseFloat(newAngle)
                    if (newDist > existingAstroid[0]) {
                        lowDistance = existingAstroid[0]
                        lowPoint = [existingX, existingY]
                    }
                    else {
                        lowDistance = newDist
                        lowPoint = [newX, newY]
                        newDist = existingAstroid[0]
                        newPoint = [existingX, existingY]
                    }
                    visibleAstroids[newAngle.toFixed(4)] = [lowDistance, [...lowPoint]]
                    newAngle += 2*Math.PI 
                }

            }
            console.log(`adding angle ${newAngle.toFixed(4)} with distance ${distance(newPoint[0], newPoint[1])} and point ${[newX,newY]}`)
            visibleAstroids[newAngle.toFixed(4)] = [newDist, [newPoint[0], newPoint[1]]]
        }
    })
    return visibleAstroids
}

function distance(x,y){
    return Math.sqrt(x*x + y*y)
}

destroyDict = destroyOrder(11,13, readInAstroids('day10.txt'))
console.log(destroyDict)
destroyOrder = Object.keys(destroyDict)
destroyOrder.sort((a,b) => parseFloat(a) - parseFloat(b))
console.log(destroyOrder.forEach((ob,index) => {console.log(`${index} = ${destroyDict[ob][1]}`)}))
console.log(destroyOrder)
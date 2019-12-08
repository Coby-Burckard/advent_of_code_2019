const fs = require('fs')

function readInFile(fileName){
    const inputArray = fs.readFileSync(fileName).toString().split('')
    return inputArray
}

function buildLayers(inputArray, rowWidth, columnHeight) {
    const layerSize = rowWidth * columnHeight
    const layersArray = []
    while(inputArray.length > 0) {
        newLayer = inputArray.splice(0, layerSize)
        layersArray.push(newLayer)
    }
    return layersArray
}

function deconstructLayer(layer) {
    let oneCount = 0
    let twoCount = 0
    let zeroCount = 0

    for (let i=0; i<layer.length; i++){
        if (layer[i] == '1'){
            oneCount++
        }
        else if (layer[i] == '2') {
            twoCount++
        }
        else if (layer[i] == '0'){
            zeroCount++
        }
    }

    return [zeroCount, oneCount*twoCount]
}

function implementPartOne() {
    const inputArray = readInFile('input.txt')
    const layersArray = buildLayers(inputArray, 25, 6)
    let layerIndex = 0
    let minZeros
    let minZerosSoln = 0

    for (let i=0; i<layersArray.length; i++) {
        let layer = layersArray[i]
        let deconstructedLayers = deconstructLayer(layer) 
        if (layerIndex == 0){
            minZeros = deconstructedLayers[0]
            minZerosSoln = deconstructedLayers[1]
        }
        else if (deconstructedLayers[0] < minZeros){
            minZeros = deconstructedLayers[0]
            minZerosSoln = deconstructedLayers[1]
        }
        layerIndex++
    }
    return minZerosSoln
}

function findVisiblePixel (pixelStack){
    /*
        Takes a stack of pixels in and returns the first visible (0 or 1)
    */
    for(let i = 0; i<pixelStack.length; i++) {
        if (pixelStack[i] != '2') {
            return (pixelStack[i] == 0) ? ' ' : pixelStack[i]
        }
    }
}

function distillPixels(layers){
    const visiblePixels = []
    let pixelStack = []
    for (let i = 0; i < layers[0].length; i++){
        pixelStack = []
        for (let j = 0; j < layers.length; j++){
            pixelStack.push(layers[j][i])
        }
        visiblePixels.push(findVisiblePixel(pixelStack))
    }

    return visiblePixels
}

function displayFinalImage(pixels, row) {
    if (pixels.length < row){
        return
    }
    console.log(pixels.splice(0,row).join(''))
    displayFinalImage(pixels, row)
}

function executePart2(inputFile, row, column) {
    const inputArray = readInFile(inputFile)
    const layersArray = buildLayers(inputArray, row, column)
    const distilledPicture = distillPixels(layersArray)
    displayFinalImage(distilledPicture, row)
}

executePart2('input.txt', 25, 6)
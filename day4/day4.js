// range 272091-815432

const start = 272091
const end = 815432

function isIncreasing(num) {
    return num.toString() == num.toString().split('').sort().join('').trim()
}

function hasDouble(num) {
    return /((^)|(.))((?(3)(?!\1).|.))\4(?!\4)/.test(num.toString())
}

function check(num) {
    return isIncreasing(num) && hasDouble(num)
}

function runDat (start, end) {
    let count = 0
    for (let i = start + 1; i < end; i++) {
        if(check(i)) count++
    }
    return count
}

console.log(runDat(start, end))
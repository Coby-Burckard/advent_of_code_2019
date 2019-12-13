const mathjs = require('mathjs')

class Planet {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
	}
	
	updateVelocity(planets){
		planets.forEach(planet => {
			if (planet != this){
				let xdif = planet.x - this.x;
				let ydif = planet.y - this.y;
				let zdif = planet.z - this.z;
				
				if (xdif != 0) {this.vx += xdif/Math.abs(xdif)}; 
				if (ydif != 0) {this.vy += ydif/Math.abs(ydif)};
				if (zdif != 0) {this.vz += zdif/Math.abs(zdif)};
			}
		})
	}
	
	updatePosition() {
		this.x += this.vx;
		this.y += this.vy;
		this.z += this.vz;
	}
	
	calcEnergy() {
		return (Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) * (Math.abs(this.vx) + Math.abs(this.vy) + Math.abs(this.vz))
	}
	
	timeStamp() {
		return [this.x, this.y, this.z, this.vx, this.vy, this.vz].join('')
	}
}

class PlanetAxis {
	constructor(position) {
		this.pos = position
		this.v = 0
	}

	updateVelocity(otherPositions){
		otherPositions.forEach(position => {
			let xdif = position.pos - this.pos;
			if (xdif != 0) {this.v += xdif/Math.abs(xdif)}; 
		})
	}

	updatePosition(){
		this.pos += this.v
	}
}

function totalEnergy(planets) {
	const total = planets.reduce((accumulator, planet) => {return accumulator + planet.calcEnergy()}, 0);
	return total
}

function part1() {
	const one = new Planet(9, 13, -8)
	const two = new Planet(-3, 16, -17)
	const three = new Planet(-4, 11, -10)
	const four = new Planet(0, -2, -2)
	planets = [one, two, three, four]
	
	for (let i = 0; i < 1000; i++){
		planets.forEach(planet => {planet.updateVelocity(planets)})
		planets.forEach(planet => {planet.updatePosition()})
		console.log(`step ${i}: energy = ${totalEnergy(planets)}`)
	}
}

function timeStampTotal(planets) {
	return planets.map(planet => planet.timeStamp()).join('')
}

function part2() {
	const one = new Planet(9, 13, -8)
	const two = new Planet(-3, 16, -17)
	const three = new Planet(-4, 11, -10)
	const four = new Planet(0, -2, -2)
	// const one = new Planet(-1,0,2)
	// const two = new Planet(2, -10, -7)
	// const three = new Planet(4,-8,8)
	// const four = new Planet(3,5,-1)
	const planetsX = [one.x, two.x, three.x, four.x]
	const planetsY = [one.y, two.y, three.y, four.y]
	const planetsZ = [one.z, two.z, three.z, four.z]
	axes = [planetsX, planetsY, planetsZ]
	axisLaps = []
	axes.forEach(axis => {
		let initialState = axis.join(' ') + [0,0,0,0].join(' ')
		let currentState = ''
		let counter = 0
		let vs = [0,0,0,0]
		while (currentState != initialState){
			for(let j = 0; j<4; j++) {
				for (let i = 0; i<4; i++){
					vs[j] += (axis[i] - axis[j] == 0) ? 0 : (axis[i] - axis[j])/Math.abs(axis[i] - axis[j])
				}
			}
			for (let i=0; i<4; i++){
				axis[i] += vs[i]
			}
			counter++
			currentState = axis.join(' ') + vs.join(' ')
		}
		axisLaps.push(counter)
		console.log(axisLaps)
	})
	console.log(mathjs.lcm(...axisLaps))
}

part2()

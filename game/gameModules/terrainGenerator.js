// create terrain
const octagon = function(radius, start_x, start_y) {
	const edgeLength = radius/Math.sqrt(4+(2 * Math.sqrt(2))) * 2;
	const v1_x = start_x;
	const v1_y = start_y;
	const v2_x = start_x + edgeLength;
	const v2_y = start_y;
	let finalArray = [[v1_x, v1_y], [v2_x, v2_y]];
	return finalArray;
}

const createPlanet = function(array, numSegs, height, roughness) {
	var points = [];
	var height = height || 180;
	var displace = height / 10;
	var roughness = roughness || 1;
	var numSegs = numSegs;
	let edgeLength = array[1][0] - array[0][0];
	const segLength = edgeLength/numSegs;
	let power = Math.pow(2, Math.ceil(Math.log(edgeLength) / (Math.log(2))));
	// TOP OF OCTAGON
	let x = array[0][0]
	let y = array[0][1];
	for(var j = 0; j < numSegs - 1; j++){
		x += segLength;
		y += (Math.random()*displace*2) - displace;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	// TOP RIGHT OF OCTAGON - work in progress
	displace = height / 10;
	for(j = 0; j < numSegs; j++){
		x += (Math.random()*displace*2) + displace/2;
		y += (Math.random()*displace*2) + displace/2;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	// RIGHT SIDE OF OCTAGON
	displace = height / 10;
	for(j = 0; j < numSegs; j++){
		x += (Math.random()*displace*2) - displace;
		y += segLength;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	// BOTTOM RIGHT OF OCTAGON - work in progress
	displace = height / 10;
	for(j = 0; j < numSegs; j++){
		x -= segLength/1.6;
		y += (Math.random()*displace*2) + displace/2;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	// BOTTOM OF OCTAGON
	displace = height / 10;
	points.push(x)
	points.push(y)
	for(j = 0; j < numSegs; j++){
		x -= segLength;
		y += (Math.random()*displace*2) - displace;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	// BOTTOM LEFT of OCTAGON - work in progress
	displace = height / 10;
	for(j = 0; j < numSegs; j++){
		x -= (Math.random()*displace*2) + displace/2;
		y -= (Math.random()*displace*2) + displace/2;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	// LEFT SIDE OF OCTAGON
	displace = height / 10;
	points.push(x)
	points.push(y)
	for(j = 0; j < numSegs; j++){
		x -= (Math.random()*displace*2) - displace;
		y -= segLength;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	// TOP LEFT OF OCTAGON - work in progress
	displace = height / 10;
	for(j = 0; j < numSegs; j++){
		x += segLength/2;
		y -= (Math.random()*displace*2) - displace/10;
		points.push(x);
		points.push(y);
		displace *= roughness;
	}
	x = (array[0][0] + x)/2;
	y = (array[0][1] + y)/2;
	points.push(x);
	points.push(y);
	return points
};
var octagonArray = octagon(window.innerWidth/1.4, 500, 150);
poly = new Phaser.Polygon(createPlanet(octagonArray, 10, 250, 1.05));
graphics = this.add.graphics(100, 100);
graphics.beginFill(0xeaeaea); // light gray
graphics.drawPolygon(poly.points);
graphics.endFill();
terrain = this.add.sprite(window.innerWidth/2, window.innerHeight * 1.9, graphics.generateTexture());
terrain.anchor.set(0.5);
graphics.destroy();
this.physics.p2.enable(terrain, false);

// terrain polygon
terrain.body.clearShapes();
console.log('points', poly.points);
console.log(createPlanet(octagonArray, 10, 250, 1.05));
let pointsArray = poly.points.map((el, i) => [el.x, el.y])
let arrOfCoords = createPlanet(octagonArray, 10, 250, 1.05)
let fn = function(number) {
	return Math.ceil(number)
}
let coords = Array.prototype.slice.call(arrOfCoords).map(number => Math.ceil(number));
let coords = Array.from(arrOfCoords)
let coords2 = Object.keys(arrOfCoords).map(key => arrOfCoords[key]);

terrain.body.addPolygon({}, coords);
terrain.x = window.innerWidth/2;
terrain.y = window.innerHeight * 1.7;
//collision - terrain won't move when hit
game.load.physics('shipPhysics', 'tracedRocket.json');
terrain.body.clearShapes();
terrain.body.loadPolygon('shipPhysics', 'terrain');

function Ship(position) {
	this.position = position;
	this.velocity = {x:0, y:0};
	this.rotation = 0;
	this.rotationSpeed = 6;
	this.speed = 0.15;
	this.inertia = 0.99;
	this.gravity = 0.0005;
	this.radius = 20;
}
Ship.prototype.rotate = function(direction) {
	let change = direction === 'right' ? 6 : -6
	this.rotation += change
}

module.exports = Ship
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
	if(direction === 'right') {
		this.rotation += this.rotationSpeed
	}
	else if (direction === 'left') {
		this.rotation -= this.rotationSpeed
	}
}

Ship.prototype.accelerate = function() {
	 this.velocity.x -= Math.sin(-1 *  this.rotation * (Math.PI/180)) * this.speed
	 this.velocity.y -= Math.cos(-1 *  this.rotation * (Math.PI/180)) * this.speed
}

module.exports = Ship
var Player = function(xSpawn, ySpawn, id, color) {
	this.xSpawn = xSpawn;
	this.ySpawn = ySpawn;
	this.x = xSpawn;
	this.y = ySpawn;
	this.id = id;
	this.color = color;
	this.wins = 0;
}

Player.prototype = {
	resetForNewRound: function() {
		this.x = this.xSpawn;
		this.y = this.ySpawn;
		this.alive = true;
	}
}

module.exports = Player;
var Player = function(id, role) {
	// this.x = xSpawn;
	// this.y = ySpawn;
	this.id = id;
	this.role = role;
}

Player.prototype = {
	resetForNewRound: function() {
		// this.x = this.xSpawn;
		// this.y = this.ySpawn;
		this.alive = true;
	}
}

module.exports = Player;
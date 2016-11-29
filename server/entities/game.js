var Game = function() {
	this.players = {};
	this.numPlayersAlive = 0;
};

Game.prototype = {
	get numPlayers() { return Object.keys(this.players).length; },
	calculateRoundWinner: function() {
		for(var i in this.players) {
			if(this.players[i].alive) {
				return this.players[i];
			}
		}
	},
	calculateGameWinners: function() {
		var winningPlayers = [];
		var maxWinCount = 0;

		for(var i in this.players) {
			if(this.players[i].wins > maxWinCount) {
				winningPlayers = [this.players[i]];
				maxWinCount = this.players[i].wins;
			} else if (this.players[i].wins == maxWinCount) {
				winningPlayers.push(this.players[i]);
			}
		}

		return winningPlayers;
	},
	resetPlayers: function() {
		for(var i in this.players) {
			var player = this.players[i];
			player.resetForNewRound();
		}
	},
	resetForNewRound: function() {
		this.resetPlayers();
		this.numPlayersAlive = Object.keys(this.players).length;
	}
};

module.exports = Game;
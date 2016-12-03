const db = require('../index.js');
const Sequelize = require('sequelize');

const GamesPlayed = db.define('gamesPlayed', {
	singleCount: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	multiCount: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
},
{
	getterMethods: {
		// total number of times the game has been played
		totalCount: function () {
			return this.singleCount + this.multiCount;
		}
	},
	instanceMethods: {
		// increment singlePlayer games played count
		incrementSingle: function() {
			this.singleCount += 1;
			this.save();
		},
		// increment multiplayer games played count
		incrementMulti: function() {
			this.multiCount += 1;
			this.save();
		}
	}
})

module.exports = GamesPlayed;

const db = require('../index.js');
const Sequelize = require('sequelize');

const GamesPlayed = db.define('gamesPlayed', {
	singleCount: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	coopCount: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
},
{
	getterMethods: {
		// total number of times the game has been played
		totalCount: function () {
			return this.singleCount + this.coopCount;
		}
	},
	instanceMethods: {
		// increment Single Player games played count
		incrementSingle: function() {
			this.singleCount += 1;
			this.save();
		},
		// increment Cooperative games played count
		incrementCoop: function() {
			this.coopCount += 1;
			this.save();
		}
	}
})

module.exports = GamesPlayed;

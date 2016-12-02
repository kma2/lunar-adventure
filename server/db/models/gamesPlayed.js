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
		totalCount: function () {
			return this.singleCount + this.multiCount;
		}
	},
	instanceMethods: {
		incrementSingle: function() {
			this.singleCount += 1;
			this.save();
		},
		incrementMulti: function() {
			this.multiCount += 1;
			this.save();
		}
	}
})

module.exports = GamesPlayed;

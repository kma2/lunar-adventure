const db = require('../index.js');
const Sequelize = require('sequelize');

const GamesPlayed = db.define('gamesPlayed', {
	count: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
}

,
{
	instanceMethods: {
		increment: function() {
			this.count += 1;
			this.save();
		}
	}
})

module.exports = GamesPlayed;
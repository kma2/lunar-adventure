const db = require('../index.js');
const Sequelize = require('sequelize');

const GamesPlayed = db.define('gamesPlayed', {
	count: {
		type: Sequelize.INTEGER
	}
})

module.exports = GamesPlayed;
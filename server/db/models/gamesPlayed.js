const db = require('../index.js');
const Sequelize = require('sequelize');

const GamesPlayed = db.define('gamesPlayed', {
	count: {
		type: Sequelize.INTEGER
	}
})
// ,
// {
	// classMethod: {
	// 	increment: function(count) {
	// 		count += 1;
	// 	}
	// }
// })

module.exports = GamesPlayed;
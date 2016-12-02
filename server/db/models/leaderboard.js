const db = require('../index.js');
const Sequelize = require('sequelize');

const Leaderboard = db.define('leaderboard', {
	name: {
		type: Sequelize.STRING(15),
		validate: {
			notEmpty: true,
		},
		// allowNull: false
	},
	time: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	gameType: {
		type: Sequelize.ENUM('SinglePlayer', 'Cooperative'),
		allowNull: false
	}
})

module.exports = Leaderboard;
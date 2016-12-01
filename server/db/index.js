const Sequelize = require('sequelize');
const herokuDB = 'postgres://dmfyfyacyfpvid:eqr77jZOFtzXY3mX_nBpb2mJTH@ec2-54-75-244-145.eu-west-1.compute.amazonaws.com:5432/devdpu6hjoou93'
const db = new Sequelize(herokuDB, {
	logging: false,
	native: true
})

module.exports = db;

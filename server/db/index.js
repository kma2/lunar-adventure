const Sequelize = require('sequelize');
const herokuDB = 'postgres://dmfyfyacyfpvid:eqr77jZOFtzXY3mX_nBpb2mJTH@ec2-54-75-244-145.eu-west-1.compute.amazonaws.com:5432/devdpu6hjoou93'
const localDB = 'postgres://localhost:5432/lunar-adventure'
const db = new Sequelize(localDB, {
	logging: false,
	native: true
})

module.exports = db;
const Sequelize = require('sequelize');

const herokuDB = 'postgres://wnbqunwhpwfcvg:c6f3a0f189451c624e2da121b82eed34d26205083ebfe75c6e156819a770180f@ec2-54-75-248-193.eu-west-1.compute.amazonaws.com:5432/d1rd3sq2l3qj79';
const localDB = 'postgres://localhost:5432/lunar-adventure';

const db = new Sequelize(process.env.DATABASE_URL || herokuDB, {
	logging: false,
	native: true
});

module.exports = db;

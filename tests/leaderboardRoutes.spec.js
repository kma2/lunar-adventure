//** CHANGE THE DB TO LOCAL IN DB/index.JS BEFORE RUNNING TESTS ** //
//** ALSO UNCOMMENT THE FORCE TRUE ON LINE 15 ** //

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server/server.js');
const Leaderboard = require('../server/db/models/leaderboard');
const agent = request.agent(app);
const db = require('../server/db/db');

// Testing leaderboard routes
describe('Leaderboard route', function() {

	before(function() {
		// return db.sync({force: true})
	});

	describe('GET /highScore/:gameType', function() {
		
		before(function() {
			Leaderboard.create({
				name: 'Test Single',
				time: 16.09,
				gameType: 'SinglePlayer'
			});

			Leaderboard.create({
				name: 'Test Coop',
				time: 20.16,
				gameType: 'Cooperative'
			});
		});

		it('returns all high scores for Single Player mode', function() {
			return agent
			.get('/highScore/SinglePlayer')
			.expect(200)
			.expect(function(res) {
				expect(res.body).to.be.an.instanceOf(Array);
				expect(res.body[0].name).to.equal('Test Single');
				expect(res.body[0].time).to.equal(16.09);
				expect(res.body[0].gameType).to.equal('SinglePlayer');
			});
		});

		it('returns all high scores for Cooperative mode', function() {
			return agent
			.get('/highScore/Cooperative')
			.expect(200)
			.expect(function(res) {
				expect(res.body).to.be.an.instanceOf(Array);
				expect(res.body[0].name).to.equal('Test Coop');
				expect(res.body[0].time).to.equal(20.16);
				expect(res.body[0].gameType).to.equal('Cooperative');
			});
		});
	});

	describe('POST /newHighScore/:gameType/:time', function() {

		it('Posts a new high score for Single Player', function() {
			return agent
			.post('/newHighScore/SinglePlayer/20.15')
			.send({
				name: 'Test username'
			})
			.expect(200)
			.expect(function(res) {
				expect(res.body).to.be.an('object');
				expect(res.body.name).to.equal('Test username');
				expect(res.body.time).to.equal(20.15);
				expect(res.body.gameType).to.equal('SinglePlayer');
			});
		});

		it('Posts a new high score for Cooperative', function() {
			return agent
			.post('/newHighScore/Cooperative/16.09')
			.send({
				name: 'Test user'
			})
			.expect(200)
			.expect(function(res) {
				expect(res.body).to.be.an('object');
				expect(res.body.name).to.equal('Test user');
				expect(res.body.time).to.equal(16.09);
				expect(res.body.gameType).to.equal('Cooperative');
			});
		});

		it('Sends a 404 if invalid time is sent for Single Player', function() {
			return agent
			.post('/newHighScore/SinglePlayer')
			.expect(404);
		});

		it('Sends a 404 if invalid time is sent for Cooperative', function() {
			return agent
			.post('/newHighScore/Cooperative')
			.expect(404);
		});
	});
});








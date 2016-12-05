//** CHANGE THE DB TO LOCAL IN DB/index.JS BEFORE RUNNING TESTS ** //
//** ALSO UNCOMMENT THE FORCE TRUE ON LINE 15 ** //

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server/server.js');
const GamesPlayed = require('../server/db/models/gamesPlayed');
const agent = request.agent(app);
const db = require('../server/db/db');

// Testing Games Played Routes
describe('Games Played Route', function() {

	beforeEach(function() {
		// return db.sync({force: true})
	});

	describe('PUT /incrementGame/:gameType', function() {

		beforeEach(function() {

			GamesPlayed.create({
					singleCount: 1,
					coopCount: 4
			});
		})

		it('Updates the game count for Single Player', function() {
			return agent
			.put('/incrementGame/SinglePlayer')
			.expect(200)
		});

		it('Updates the game count for Cooperative', function() {
			return agent
			.put('/incrementGame/Cooperative')
			.expect(200)
		});
	});

	describe('GET /totalTimesPlayed', function () {

		beforeEach(function() {

			GamesPlayed.create({
				singleCount: 1,
				coopCount: 4
			});
		});

		it('Gets total times played for all modes', function() {
			return agent
			.get('/totalTimesPlayed')
			.expect(200)
			.expect(function (res) {
				expect(res.body).to.be.an('object')
				expect(res.body['Single Count']).to.equal(1)
				expect(res.body['Coop Count']).to.equal(4)
				expect(res.body['Total Count']).to.equal(5)
			});
		});
	});
});
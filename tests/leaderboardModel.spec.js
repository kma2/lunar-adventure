//** CHANGE THE DB TO LOCAL IN DB/index.JS BEFORE RUNNING TESTS ** //
//** ALSO UNCOMMENT THE FORCE TRUE ON LINE 12 ** //

const expect = require('chai').expect;
const Leaderboard = require('../server/db/models/leaderboard');
const db = require('../server/db/db');

// Leaderboard tests
describe('Leaderboard model tests', function() {

	beforeEach('Clear the database', function() {
		// return db.sync({force: true});
	});

	//might need an after as well?

	describe('Name field', function() {

		it('has a name', function() {
			return Leaderboard.create({
				name: 'test name',
				time: 24.15,
				gameType: 'SinglePlayer'
			})
			.then(player => {
				expect(player.name).to.equal('test name');
			})
		});

		it('does not allow names longer than 15 characters', function() {
			let testInstance = Leaderboard.build({
				name: 'test name that is too long',
				time: 24.15,
				gameType: 'SinglePlayer'
			})
			return testInstance.validate()
			.then(result => {
				expect(result).to.equal(null);
			})
		});
	});

	it('has a time field', function() {
		return Leaderboard.create({
			name: 'test name',
			time: 24.15,
			gameType: 'SinglePlayer'
		})
		.then(player => {
			expect(player.time).to.equal(24.15);
		})
	});

	describe('Game type field', function() {
		
		it('has a game type field that is Single Player', function() {
			return Leaderboard.create({
				name: 'test name',
				time: 24.15,
				gameType: 'SinglePlayer'
			})
			.then(player => {
				expect(player.gameType).to.equal('SinglePlayer');
			})
		});
		it('has a game type field that is Cooperative', function() {
			return Leaderboard.create({
				name: 'test name',
				time: 24.15,
				gameType: 'Cooperative'
			})
			.then(player => {
				expect(player.gameType).to.equal('Cooperative');
			})
		});

		it('returns an error for invalid game types', function() {
			let badGameType = Leaderboard.build({
				name: 'test name',
				time: 24.15,
				gameType: 'badGameType'
			});
			badGameType.validate()
			.then(result => {
				expect(result).to.equal(null)
			})
		});
	});
});
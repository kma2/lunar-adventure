//** CHANGE THE DB TO LOCAL IN DB/index.JS BEFORE RUNNING TESTS ** //
//** ALSO UNCOMMENT THE FORCE TRUE ON LINE 12 ** //

const expect = require('chai').expect;
const GamesPlayed = require('../server/db/models/gamesPlayed');
const db = require('../server/db/db');

// Games Played tests
describe('Games Played model tests', function() {

	beforeEach('Clear the database', function() {
		// return db.sync({force: true});
	});

	describe('Single and Coop count', function() {
		it('returns an error if a string is passed in for count', function() {
			let failCase = GamesPlayed.build({
				singleCount: '',
				coopCount: ''
			});

			return failCase.validate()
			.then(result => {
				expect(result).to.equal(null)
			})
		});

		it('creates a count if passed in properly', function() {
			GamesPlayed.create({
				singleCount: 1,
				coopCount: 2
			})
			.then(result => {
				expect(result.singleCount).to.equal(1);
				expect(result.coopCount).to.equal(2);
			})
		});
	});

	describe('Getter Methods', function() {
		
		beforeEach('create an instance', function() {
			GamesPlayed.create({
				singleCount: 1,
				coopCount: 4
			})
		});

		describe('total count', function() {
			it('returns the sum of single count and coop count', function() {
				GamesPlayed.findById(1)
				.then(game => {
					expect(game.totalCount).to.equal(5);
				})
			});
		});
	});

	describe('instance methods', function() {

		describe('increment single', function() {
			it('increments single count by 1 each time it is called', function() {
				GamesPlayed.create({
					singleCount: 1,
					coopCount: 1
				})
				.then(game => {
					expect(game.singleCount).to.equal(1);
					game.incrementSingle();
					expect(game.singleCount).to.equal(2);
					game.incrementSingle();
					expect(game.singleCount).to.equal(3);
				})
			});
		});

		describe('increment coop', function() {
			it('increments coop count by 1 each time it is called', function() {
				GamesPlayed.create({
					singleCount: 2,
					coopCount: 2
				})
				.then(game => {
					expect(game.coopCount).to.equal(2);
					game.incrementCoop();
					expect(game.coopCount).to.equal(3);
					game.incrementCoop();
					expect(game.coopCount).to.equal(4);
				})
			});
		});
	});
});
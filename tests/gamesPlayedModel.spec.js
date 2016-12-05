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

	describe('Single and Multi count', function() {
		it('returns an error if a string is passed in for count', function() {
			let failCase = GamesPlayed.build({
				singleCount: '',
				multiCount: ''
			});

			return failCase.validate()
			.then(result => {
				expect(result).to.equal(null)
			})
		});

		it('creates a count if passed in properly', function() {
			GamesPlayed.create({
				singleCount: 1,
				multiCount: 2
			})
			.then(result => {
				expect(result.singleCount).to.equal(1);
				expect(result.multiCount).to.equal(2);
			})
		});
	});

	describe('Getter Methods', function() {
		
		beforeEach('create an instance', function() {
			GamesPlayed.create({
				singleCount: 1,
				multiCount: 4
			})
		});

		describe('total count', function() {
			it('returns the sum of single count and multi count', function() {
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
					multiCount: 1
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

		describe('increment multi', function() {
			it('increments multi count by 1 each time it is called', function() {
				GamesPlayed.create({
					singleCount: 2,
					multiCount: 2
				})
				.then(game => {
					expect(game.multiCount).to.equal(2);
					game.incrementMulti();
					expect(game.multiCount).to.equal(3);
					game.incrementMulti();
					expect(game.multiCount).to.equal(4);
				})
			});
		});
	});
});
// import modules
const bodyParser = require('body-parser');
const {resolve} = require('path');
const express = require('express');
const db = require('./db/db');

// import models
const Leaderboard = require('./db/models/leaderboard.js');
const GamesPlayed = require('./db/models/gamesPlayed.js');

// set up server
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 3000;

const authorizationHeader = 'Basic: ' + '5UmX^-6L]Vp/yOHx69e8Qbm2z%9t=E';

// set up bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set static directory
app.use(express.static(resolve(__dirname, '..', 'public')))
.use(express.static(resolve(__dirname, '..', 'game')))
.use(express.static(resolve(__dirname, '..', 'node_modules')));

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, '..','public', 'index.html'));
});

// get route for high scores
app.get('/highScore/:gameType', (req, res, next) => {

	Leaderboard.findAll({
		where: {
			gameType: req.params.gameType
		},
		order: [['time']],
		limit: 8
	})
	.then(scores => res.send(scores))
	.catch(next)
});

// post route for new high score
app.post('/newHighScore/:gameType/:time', (req, res, next) => {
	if (!req.headers.authorization) {
		return res.json({error: "Unauthorized"})
	}

	Leaderboard.create({
		name: req.body.name,
		time: req.params.time,
		gameType: req.params.gameType
	})
	.then(highScore => res.send(highScore))
	.catch(next)
});

// put route for updating the number of times game has been played
app.put('/incrementGame/:gameType', (req, res, next) => {
	if (!req.headers.authorization) {
		return res.json({error: "Unauthorized"})
	}

	if (req.params.gameType === 'SinglePlayer') {
		GamesPlayed.findById(1)
		.then(game => {
			game.incrementSingle()
			res.sendStatus(200)
		})
		.catch((err) => console.error("Problem updating single", err))
	}
	else if (req.params.gameType === 'Cooperative') {
		GamesPlayed.findById(1)
		.then(game => {
			game.incrementCoop()
			res.sendStatus(200)
		})
		.catch((err) => console.error("Problem updating coop", err))
	}
});

// get route for getting total game count
app.get('/totalTimesPlayed', (req, res, next) => {
	GamesPlayed.findById(1)
	.then(game => {
		let results = {'Single Count': game.singleCount, 'Coop Count': game.coopCount, 'Total Count': game.totalCount}
		res.json(results)
	})
	.catch(err => console.error('Problem getting total count', err))
});

function startServer() {

	// Module.parent checks if we're already listening (like in tests) to prevent EADDRINUSE error
	if (!module.parent) {
		http.listen(PORT);
		console.log('Listening on port', PORT);
		db.sync({force: false})
		.then(() => {
			console.log('Database successfully synced');
			GamesPlayed.findById(1)
			.then(game => {
				if (!game) {
					GamesPlayed.create({
						singleCount: 0,
						coopCount: 0
					})
					.catch(err => console.error(err))
				}
			})
			.catch((err) => console.error('Problem syncing database', err))
		});
	}
}

startServer();

// error handler
app.use((err, req, res, next) => {
	res.status(500).send(err);
});

app.use((req, res) => res.sendStatus(404));

module.exports = app;
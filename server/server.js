//MODELS
const Leaderboard = require('./db/models/leaderboard.js')
const GamesPlayed = require('./db/models/gamesPlayed.js')

//BODY PARSER
const bodyParser = require('body-parser');

// MODULES
const {resolve} = require('path');

// APP
const express = require('express');
const app = express();

const http = require('http').Server(app);
// const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

//DATABASE
const db = require('./db/db');

// GAME OBJECTS
// const Player = require("./entities/player");
// const Game = require("./entities/game");
// const Lobby = require("./lobby");
// const GameRoom = require("./entities/gameRoom.js");

// let games = {};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set static dir
app.use(express.static(resolve(__dirname, '..', 'public')))
.use(express.static(resolve(__dirname, '..', 'game')))
.use(express.static(resolve(__dirname, '..', 'node_modules')))

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, '..','public', 'index.html'))
})

//get route for high scores

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
})

//get route for number of games played
app.get('/gamesPlayed', (req, res, next) => {
	GamesPlayed.findById(1)
	.then(number => res.send(number))
	.catch(next)
})

//post route for new high score

app.post('/newHighScore/:gameType/:time', (req, res, next) => {
	Leaderboard.create({
		name: req.body.name,
		time: req.params.time,
		gameType: req.params.gameType
	})
	.then(highScore => res.send(highScore))
	.catch(next)
})

//put route for games played
app.put('/incrementGame/:gameType', (req, res, next) => {
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
			game.incrementMulti()
			res.sendStatus(200)
		})
		.catch((err) => console.error("Problem updating multi", err))
	}
})

//get route for getting total game count
app.get('/totalTimesPlayed', (req, res, next) => {
	GamesPlayed.findById(1)
	.then(game => {
		res.json(game.totalCount)
	})
	.catch(err => console.error('Problem getting total count', err))
})

function startServer() {
	http.listen(PORT)
	console.log('Listening on port', PORT)
	console.log('Syncing the db')
	db.sync()
	.then(() => {
		console.log('Database successfully synced')
		GamesPlayed.findById(1)
		.then(game => {
			if (!game) {
				GamesPlayed.create({
					singleCount: 0,
					multiCount: 0
				})
				.catch(err => console.error(err))
			}
		})
	.catch((err) => console.error('Problem syncing database', err))
	})
}
startServer()

app.use((err, req, res, next) => {
	res.status(500).send(err)
})

app.use((req, res) => res.sendStatus(404))


// SOCKET SETUP
// init();

// function init() {
// 	Lobby.initialize();
// 	setEventHandlers();
// }

// function setEventHandlers () {
// 	io.on('connection', (socket) => {
// 		console.log('a user connected');

// 		// Set join and leave methods for subscribing room
// 		socket.on('subscribe', function(data) { socket.join(data); })
// 		socket.on('unsubscribe', function(data) { socket.leave(data); })

// 		socket.on("disconnect", function() { onClientDisconnect.call(this); });
// 		socket.on("enter lobby", function() { Lobby.onEnterLobby.call(this, io); });
// 		socket.on("host game", function(data) { Lobby.onHostGame.call(this, data, io); });
// 		socket.on("enter game room", function(data) { Lobby.onEnterGameRoom.call(this, data, io); });
// 		socket.on("leave game room", function() { Lobby.onLeaveGameRoom.call(this, io); });

// 		socket.on("start game on server", function() { onStartGame.call(this); });
// 		socket.on("move player", onMovePlayer);
// 	});
// }

// function onClientDisconnect() {
// 	if (this.gameId == null) { return; }

// 	let lobbySlots = Lobby.getLobbySlots();
// 	let slotState = lobbySlots[this.gameId].state

// 	if (slotState == "joinable" || slotState == "full") {
// 		Lobby.onLeaveGameRoom.call(this, io);
// 	} else if (slotState == "settingup") {
// 		slotState = "empty";
// 		Lobby.broadcastSlotStateUpdate(this.gameId, "empty", io);
// 	} else if(slotState == "inprogress") {
// 		var game = games[this.gameId];

// 		if(this.id in game.players) {
// 			delete game.players[this.id];
// 			io.in(this.gameId).emit("remove player", {id: this.id});
// 		}

// 		if(game.numPlayers < 2) {
// 			if(game.numPlayers == 1) {
// 				io.in(this.gameId).emit("no opponents left");
// 			}
// 			terminateExistingGame(this.gameId);
// 		}

// 		if(game.awaitingAcknowledgements && game.numEndOfRoundAcknowledgements >= game.numPlayers) {
// 			game.awaitingAcknowledgements = false;
// 		}
// 	}
// };

// Deletes the game object and frees up the slot.
// function terminateExistingGame(gameId) {
// 	delete games[gameId];
// 	Lobby.getLobbySlots()[gameId] = new GameRoom();
// 	Lobby.broadcastSlotStateUpdate(gameId, "empty", io);
// };

// function onStartGame() {
// 	var lobbySlots = Lobby.getLobbySlots();
// 	var game = new Game();
// 	games[this.gameId] = game;
// 	var gameRoom = lobbySlots[this.gameId];

// 	lobbySlots[this.gameId].state = "inprogress";
// 	Lobby.broadcastSlotStateUpdate(this.gameId, "inprogress", io);
// 	var ids = gameRoom.getPlayerIds();

// 	for(var i = 0; i < ids.length; i++) {
// 		var playerId = ids[i];
// 		// var newPlayer = new Player(spawnPoint.x * TILE_SIZE, spawnPoint.y * TILE_SIZE, "down", playerId, pendingGame.players[playerId].color);
// 		game.players[playerId] = i === 0 ? 'left' : 'up'
// 	}
// 	game.numPlayersAlive = ids.length;
// 	io.in(this.gameId).emit("start game on client", {players: game.players});
// };

// function onMovePlayer(data) {
// 	var game = games[this.gameId];

// 	if(game === undefined || game.awaitingAcknowledgements) {
// 		return;
// 	}

// 	var movingPlayer = game.players[this.id];

// 	// Moving player can be null if a player is killed and leftover movement signals come through.
// 	if(!movingPlayer) {
// 		return;
// 	}

// 	movingPlayer.x = data.x;
// 	movingPlayer.y = data.y;
// 	movingPlayer.facing = data.facing;
// 	movingPlayer.hasMoved = true;
// };

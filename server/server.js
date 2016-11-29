// MODULES
const {resolve} = require('path');

// APP
const express = require('express');
const app = express();

// SOCKET
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

// GAME OBJECTS
const Player = require("./entities/player");
const Game = require("./entities/game");
const Lobby = require("./lobby");
const GameRoom = require("./entities/gameRoom.js");

let games = {};

// Set static dir
app.use(express.static(resolve(__dirname, '..', 'public')))
.use(express.static(resolve(__dirname, '..', 'game')))
.use(express.static(resolve(__dirname, '..', 'node_modules')))

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, '..','public', 'index.html'))
})

// SOCKET SETUP
init();

function init() {
	Lobby.initialize();
	setEventHandlers();
}

function setEventHandlers () {
	io.on('connection', (socket) => {
		console.log('a user connected');

		// Set join and leave methods for subscribing room
		socket.on('subscribe', function(data) { socket.join(data); })
		socket.on('unsubscribe', function(data) { socket.leave(data); })

		socket.on("disconnect", function() { onClientDisconnect.call(this); });
		socket.on("start game on server", function() { onStartGame.call(this); });
		socket.on("enter lobby", function() { Lobby.onEnterLobby.call(this, io); });
		socket.on("host game", function(data) { Lobby.onHostGame.call(this, data, io); });
		socket.on("enter game room", function(data) { Lobby.onEnterGameRoom.call(this, data, io); });
		socket.on("leave game room", function() { Lobby.onLeaveGameRoom.call(this, io); });
	});
}

function onClientDisconnect() {
	if (this.gameId == null) { return; }

	let lobbySlots = Lobby.getLobbySlots();
	let slotState = lobbySlots[this.gameId].state

	if (slotState == "joinable" || slotState == "full") {
		Lobby.onLeaveGameRoom.call(this, io);
	} else if (slotState == "settingup") {
		slotState = "empty";
		Lobby.broadcastSlotStateUpdate(this.gameId, "empty", io);
	} else if(slotState == "inprogress") {
		var game = games[this.gameId];

		if(this.id in game.players) {
			delete game.players[this.id];	
			io.in(this.gameId).emit("remove player", {id: this.id});    
		}

		if(game.numPlayers < 2) {
			if(game.numPlayers == 1) {
				io.in(this.gameId).emit("no opponents left");
			}
			terminateExistingGame(this.gameId);
		}

		if(game.awaitingAcknowledgements && game.numEndOfRoundAcknowledgements >= game.numPlayers) {
			game.awaitingAcknowledgements = false;
		}
	}
};

// Deletes the game object and frees up the slot.
function terminateExistingGame(gameId) {
	delete games[gameId];
	Lobby.getLobbySlots()[gameId] = new GameRoom();
	Lobby.broadcastSlotStateUpdate(gameId, "empty", io);
};

function onStartGame() {
	var lobbySlots = Lobby.getLobbySlots();
	var game = new Game();
	games[this.gameId] = game;
	var gameRoom = lobbySlots[this.gameId];

	lobbySlots[this.gameId].state = "inprogress";
	Lobby.broadcastSlotStateUpdate(this.gameId, "inprogress", io);
	var ids = gameRoom.getPlayerIds();
	
	for(var i = 0; i < ids.length; i++) {
		var playerId = ids[i];
		// var newPlayer = new Player(spawnPoint.x * TILE_SIZE, spawnPoint.y * TILE_SIZE, "down", playerId, pendingGame.players[playerId].color);
		game.players[playerId] = i;
	}
	game.numPlayersAlive = ids.length;
	io.in(this.gameId).emit("start game on client", {players: game.players});
};

http.listen(PORT)
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
// const Bomb = require("./entities/bomb");
// const Map = require("./entities/map");
// const MapInfo = require("../common/map_info");
const Game = require("./entities/game");
const Lobby = require("./lobby");
const PendingGame = require("./entities/pending_game");
// const PowerupIDs = require("../common/powerup_ids");

let games = {};

app.use(express.static(resolve(__dirname, '..', 'public')))
.use(express.static(resolve(__dirname, '..', 'game')))
.use(express.static(resolve(__dirname, '..', 'node_modules')))

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, '..','public', 'index.html'))
})

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

    // socket.on("move player", onMovePlayer);
    socket.on("disconnect", function() {
        onClientDisconnect.call(this)
    })
    // socket.on("place bomb", onPlaceBomb);
    // socket.on("register map", onRegisterMap);
    socket.on("start game on server", function () {
        onStartGame.call(this)
    });
    // socket.on("ready for round", onReadyForRound);
    // socket.on("powerup overlap", onPowerupOverlap);

    // socket.on('multiPlayer', Lobby.initialize)

    socket.on("enter lobby", function() {
        Lobby.onEnterLobby.call(this, io)
    });
	socket.on("host game", function(data) {
        Lobby.onHostGame.call(this, data, io);
	})

    // socket.on("select stage", Lobby.onStageSelect);
	socket.on("enter pending game", function(data) {
        Lobby.onEnterPendingGame.call(this, data, io);
	})

    socket.on("leave pending game", function() {
        Lobby.onLeavePendingGame.call(this, io);
    })
});

}


function onClientDisconnect() {
    if (this.gameId == null) {
        return;
    }

    var lobbySlots = Lobby.getLobbySlots();

    if (lobbySlots[this.gameId].state == "joinable" || lobbySlots[this.gameId].state == "full") {
        Lobby.onLeavePendingGame.call(this, io);
    } else if (lobbySlots[this.gameId].state == "settingup") {
        lobbySlots[this.gameId].state = "empty";

        Lobby.broadcastSlotStateUpdate(this.gameId, "empty", io);
    } else if(lobbySlots[this.gameId].state == "inprogress") {
        var game = games[this.gameId];
    
        if(this.id in game.players) {
            console.log("deleting " + this.id);
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
    games[gameId].clearBombs();

    delete games[gameId];

    Lobby.getLobbySlots()[gameId] = new PendingGame();

    Lobby.broadcastSlotStateUpdate(gameId, "empty", io);
};

function onStartGame() {
    var lobbySlots = Lobby.getLobbySlots();

    var game = new Game();
    games[this.gameId] = game;
    var pendingGame = lobbySlots[this.gameId];
    lobbySlots[this.gameId].state = "inprogress";

    Lobby.broadcastSlotStateUpdate(this.gameId, "inprogress", io);

    var ids = pendingGame.getPlayerIds();
    
    for(var i = 0; i < ids.length; i++) {
        var playerId = ids[i];
        // var spawnPoint = MapInfo[pendingGame.mapName].spawnLocations[i];
        // var newPlayer = new Player(spawnPoint.x * TILE_SIZE, spawnPoint.y * TILE_SIZE, "down", playerId, pendingGame.players[playerId].color);
        // newPlayer.spawnPoint = spawnPoint;

        game.players[playerId] = i;
    }

    game.numPlayersAlive = ids.length;

    io.in(this.gameId).emit("start game on client", {mapName: pendingGame.mapName, players: game.players});
};



http.listen(PORT)
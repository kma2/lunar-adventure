// logic related to hosting/joining games.

let GameRoom = require("./entities/gameRoom");
let lobbySlots = [];
let lobbyId = -1;
let numLobbySlots = 7;

let Lobby = {
	getLobbySlots: function() { return lobbySlots; },
	getLobbyId: function() { return lobbyId; },
	getNumLobbySlots: function() { return numLobbySlots; },
	broadcastSlotStateUpdate: function(gameId, newState, io) {
		broadcastSlotStateUpdate(gameId, newState, io);
	},
	initialize: function() {
		for(let i = 0; i < numLobbySlots; i++) {
			lobbySlots.push(new GameRoom());
		}
	},
	onEnterLobby: function(io) {
		this.join(lobbyId);
		io.in(lobbyId).emit("add slots", lobbySlots);
	},
	onHostGame: function(data, io) {
		lobbySlots[data.gameId].state = "joinable";
		this.gameId = data.gameId;
		broadcastSlotStateUpdate(data.gameId, "joinable", io);
	},
	onEnterGameRoom: function(data, io) {
		let gameRoom = lobbySlots[data.gameId];

		this.leave(lobbyId);
		this.join(data.gameId);
	
		gameRoom.addPlayer(this.id);
		this.gameId = data.gameId;
	
		this.emit("show current players", {players: gameRoom.players});
		this.broadcast.to(data.gameId).emit("player joined", {id: this.id, color: gameRoom.players[this.id].color});
	
		if(gameRoom.getNumPlayers() >= 2) {
			gameRoom.state = "full";
			broadcastSlotStateUpdate(data.gameId, "full", io);
		}
	},
	onLeaveGameRoom: function(io) { leaveGameRoom.call(this, io); }
};

function broadcastSlotStateUpdate(gameId, newState, io) {
	io.in(lobbyId).emit("update slot", {gameId: gameId, newState: newState});
};

function leaveGameRoom(io) {
	let lobbySlot = lobbySlots[this.gameId];

	this.leave(this.gameId);
	lobbySlot.removePlayer(this.id);
	io.in(this.gameId).emit("player left", {players: lobbySlot.players});

	if(lobbySlot.getNumPlayers()== 0) {
		lobbySlot.state = "empty";
		io.in(lobbyId).emit("update slot", {gameId: this.gameId, newState: "empty"});
	}

	if(lobbySlot.state == "full") {
		lobbySlot.state = "joinable";
		io.in(lobbyId).emit("update slot", {gameId: this.gameId, newState: "joinable"});
	}
};

module.exports = Lobby;
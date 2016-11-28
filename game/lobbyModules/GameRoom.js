LunarAdventure.GameRoom = function(){};

let minPlayerMessageOffsetX = 80;
let minPlayerMessageOffsetY = 400;
let numCharacterSquares = 2;

LunarAdventure.GameRoom.prototype = {
	init: function(gameId) { this.gameId = gameId; },

	create: function() {
		socket.emit("enter game room", {gameId: this.gameId});

		// Setup page
		this.background = this.game.add.tileSprite(0, 0, width, height, 'starfield');

		let board = this.game.add.graphics();
		board.beginFill(0xdddddd, 0.5);
		board.drawRoundedRect(width/6, height/10 * 1.5, width/6 * 4, height/10 * 8, 15)
		board.endFill()

		let heading = this.game.add.text(width/2, height/10, `Game ${this.gameId}`, textStyle(height/15, 'white'));
		heading.anchor.set(0.5);

		// add start button
		this.startGameButton = this.game.add.graphics(width/3.8 , height/10 * 8);
		this.startGameButton.beginFill(0x333333, 1);
		this.startGameButton.drawRoundedRect(0,0, width/5, height/13, 10)
		let text1 = this.game.add.text(this.startGameButton.centerX, this.startGameButton.centerY, 'Start', textStyle(height/25, 'white'));
		text1.anchor.set(0.5)

		// add leaveGame button
		this.leaveGameButton = this.game.add.graphics(width/1.85 , height/10 * 8);
		this.leaveGameButton.beginFill(0x2222aa, 1);
		this.leaveGameButton.drawRoundedRect(0,0, width/5, height/13, 10)
		let text2 = this.game.add.text(this.leaveGameButton.centerX, this.leaveGameButton.centerY, 'Leave Game', textStyle(height/25, 'white'));
		text2.anchor.set(0.5);
		this.leaveGameButton.inputEnabled = true;
		this.leaveGameButton.events.onInputDown.add(this.leaveGameAction, {gameId: this.gameId, LunarAdventure: this})

		this.characterSquares = this.drawCharacterSquares(numCharacterSquares);
		this.characterImages = [];
		this.numPlayersInGame = 0;

		this.minPlayerMessage = this.game.add.text(width/2, height/1.4, "Cannot start game without at least 2 players.", textStyle(height/40, 'white'))
		this.minPlayerMessage.anchor.set(0.5)
		this.minPlayerMessage.visible = false;

		socket.on("show current players", this.populateCharacterSquares.bind(this));
		socket.on("player joined", this.playerJoined.bind(this));
		socket.on("player left", this.playerLeft.bind(this));
		socket.on("start game on client", this.startGame);
	},

	drawCharacterSquares: function(numOpenings) {
		let characterSquares = [];
		// let xOffset, yOffset

		for(let i = 0; i < numOpenings; i++) {
			// // for 6 squares
			// if (i <= 2) {
			// 	xOffset = width/5 * (i+1);
			// 	yOffset = height/10 * 2;
			// } else {
			// 	xOffset = width/5 * (i-2);
			// 	yOffset = height/10 * 5;
			// }
			// let frame = this.game.add.graphics(xOffset, yOffset);

			let frame = this.game.add.graphics(width/7 * (i * 2 +2), height/4)
			frame.beginFill(0x222222, 0.8);
			frame.drawRoundedRect(0,0, width/7, height/3, 10)
			characterSquares[i] = frame
		}

		return characterSquares;
	},
	
	update: function() {
		this.background.tilePosition.x += 0.5;
		this.background.tilePosition.y -= 0.5;
	},

	populateCharacterSquares: function(data) {
		this.numPlayersInGame = 0;
		for(let playerId in data.players) {
			let square = this.characterSquares[this.numPlayersInGame]
			let userCharacter = this.game.add.image(square.position.x, square.position.y, 'astronaut');
			userCharacter.scale.setTo(height/950);
			userCharacter.anchor.set(-0.13)

			let text = this.game.add.text(square.position.x + square.width/2, square.position.y + square.height * 0.8, 'user name', textStyle(height/40, 'white'));
			text.anchor.set(0.5)
			
			this.characterImages[playerId] = {
				userCharacter: userCharacter,
				text: text
			}
			this.numPlayersInGame++;
		}

		if(this.numPlayersInGame > 1) { this.activateStartGameButton(); } 
		else { this.minPlayerMessage.visible = true; }
	},

	playerJoined: function(data) {
		this.numPlayersInGame++;
		let index = this.numPlayersInGame - 1;
		let square = this.characterSquares[index]
		let userCharacter = this.game.add.image(square.position.x, square.position.y, 'astronaut');
		userCharacter.scale.setTo(height/950);
		userCharacter.anchor.set(-0.13);
		
		let text = this.game.add.text(square.position.x + square.width/2, square.position.y + square.height * 0.8, 'user name', textStyle(height/40, 'white'));
		text.anchor.set(0.5)

		this.characterImages[data.id] = {
			userCharacter: userCharacter,
			text: text
		}
		if(this.numPlayersInGame == 2) { this.activateStartGameButton(); }
	},

	activateStartGameButton: function() {
		this.minPlayerMessage.visible = false;

		this.startGameButton.clear();
		this.startGameButton.beginFill(0xaa2222, 1);
		this.startGameButton.drawRoundedRect(0,0, width/5, height/13, 10)
		this.startGameButton.inputEnabled = true;
		this.startGameButton.events.onInputDown.add(this.startGameAction, this);
	},

	deactivateStartGameButton: function() {
		this.minPlayerMessage.visible = true;
		this.startGameButton.clear();
		this.startGameButton.beginFill(0x888888, 1);
		this.startGameButton.drawRoundedRect(0,0, width/5, height/13, 10)
		this.startGameButton.inputEnabled = false;
	},

	playerLeft: function(data) {
		this.numPlayersInGame--;
		if(this.numPlayersInGame == 1) { this.deactivateStartGameButton(); }

		for(let playerId in this.characterImages) {
			this.characterImages[playerId].userCharacter.destroy();
			this.characterImages[playerId].text.destroy();
		}
		this.populateCharacterSquares(data);
	},

	startGameAction: function() { socket.emit("start game on server"); },

	leaveGameAction: function() {
		socket.emit("leave game room");
		socket.removeAllListeners();
		LunarAdventure.game.state.start("Lobby", true, false);
	},

	startGame: function(data) {
		socket.removeAllListeners();
		LunarAdventure.game.state.start("Game", true, false, data.mapName, data.players, this.id);
	}
}
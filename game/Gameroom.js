LunarAdventure.Gameroom = function(){};

var xOffset = 40;
var yOffset = 50;

var buttonXOffset = 330;
var startGameButtonYOffset = 400;
var leaveButtonYOffset = 450;

var characterSquareStartingX = 330;
var characterSquareStartingY = 80;
var characterSquareXDistance = 105;
var characterSquareYDistance = 100;

var characterOffsetX = 4.5;
var characterOffsetY = 4.5;

var minPlayerMessageOffsetX = 80;
var minPlayerMessageOffsetY = 400;

var numCharacterSquares = 6;

var repeatingBombTilesprite;


LunarAdventure.Gameroom.prototype = {
	init: function(gameId) {
		this.gameId = gameId;
	},

	create: function() {
		socket.emit("enter pending game", {gameId: this.gameId});

		var background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'wallpaper');
		var board = this.game.add.graphics();
		board.beginFill(0x444444, 0.4);
		board.drawRoundedRect(this.game.width/6, this.game.height/10 * 1.5, this.game.width/6 * 4, this.game.height/10 * 8, 15)
		board.endFill()
		var heading = this.game.add.text(this.game.width/2, this.game.height/10, `Game ${this.gameId}`, textStyle(this.game.height/15, 'black'));
		heading.anchor.set(0.5);


		// this.startGameButton = this.game.add.button(buttonXOffset, startGameButtonYOffset, TEXTURES, null, this, "lobby/buttons/start_game_button_03.png", "lobby/buttons/start_game_button_03.png");
		this.startGameButton = this.game.add.graphics(this.game.width/4 , this.game.height/10 * 8);
		this.startGameButton.beginFill(0x888888, 1);
		this.startGameButton.drawRoundedRect(0,0, this.game.width/5, this.game.height/13, 10)
		var text = this.game.add.text(this.startGameButton.centerX, this.startGameButton.centerY, 'Start', textStyle(this.game.height/25, 'white'));
		text.anchor.set(0.5)

		
		// this.leaveGameButton = this.game.add.button(buttonXOffset, leaveButtonYOffset, TEXTURES, this.leaveGameAction, null, 
			// "lobby/buttons/leave_game_button_02.png", "lobby/buttons/leave_game_button_01.png");

		this.leaveGameButton = this.game.add.graphics(this.game.width/2 , this.game.height/10 * 8);
		this.leaveGameButton.beginFill(0x2222aa, 1);
		this.leaveGameButton.drawRoundedRect(0,0, this.game.width/5, this.game.height/13, 10)
		var text = this.game.add.text(this.leaveGameButton.centerX, this.leaveGameButton.centerY, 'Leave Game', textStyle(this.game.height/25, 'white'));
		text.anchor.set(0.5);
		this.leaveGameButton.inputEnabled = true;
		this.leaveGameButton.events.onInputDown.add(this.leaveGameAction, {gameId: this.gameId, LunarAdventure: this})

		// this.leaveGameButton.setDownSound(buttonClickSound);
		
		this.characterSquares = this.drawCharacterSquares(6);
		this.characterImages = [];
		this.numPlayersInGame = 0;

		this.minPlayerMessage = this.game.add.text(minPlayerMessageOffsetX, minPlayerMessageOffsetY, "Cannot start game without\nat least 2 players.")
		this.minPlayerMessage.visible = false;

		socket.on("show current players", this.populateCharacterSquares.bind(this));
		socket.on("player joined", this.playerJoined.bind(this));
		socket.on("player left", this.playerLeft.bind(this));
		socket.on("start game on client", this.startGame);
	},

	update: function() {
	},

	drawCharacterSquares: function(numOpenings) {
		var characterSquares = [];
		var xOffset, yOffset

		for(var i = 0; i < numOpenings; i++) {
			// var frame = i < numOpenings ? "lobby/slots/character_square_01.png" : "lobby/slots/character_square_02.png";
			if (i <= 2) {
				xOffset = this.game.width/5 * (i+1);
				yOffset = this.game.height/10 * 2
			} else {
				xOffset = this.game.width/5 * (i-2)
				yOffset = this.game.height/10 * 5
			}
			var frame = this.game.add.graphics(xOffset, yOffset);
			frame.beginFill(0x222222, 0.8);
			frame.drawRoundedRect(0,0, this.game.width/7, this.game.width/7, 10)
			characterSquares[i] = frame
			// characterSquares[i] = this.game.add.sprite(xOffset, yOffset, 'astronaut', frame);
			// characterSquares[i].scale.setTo(0.5);
			// characterSquares[i].anchor.set(-0.25)
		}

		return characterSquares;
	},

	populateCharacterSquares: function(data) {
		this.numPlayersInGame = 0;
		for(var playerId in data.players) {
			// var color = data.players[playerId].color;
			var userCharacter = this.game.add.image(this.characterSquares[this.numPlayersInGame].position.x, this.characterSquares[this.numPlayersInGame].position.y, 'astronaut');
			userCharacter.scale.setTo(0.7);
			this.characterImages[playerId] = userCharacter
			this.numPlayersInGame++;
		}

		if(this.numPlayersInGame > 1) {
			this.activateStartGameButton();
		} else {
			// this.minPlayerMessage.visible = true;
		}
	},

	playerJoined: function(data) {
		this.numPlayersInGame++;

		var index = this.numPlayersInGame - 1;

		var userCharacter = this.game.add.image(this.characterSquares[index].position.x, this.characterSquares[index].position.y, 'astronaut');
			userCharacter.scale.setTo(0.7);
			this.characterImages[data.id] = userCharacter

		// this.characterImages[data.id] = this.game.add.image(this.characterSquares[index].position.x + characterOffsetX,
		//  this.characterSquares[index].position.y + characterOffsetY, TEXTURES, "lobby/bomberman_head/bomberman_head_" +  data.color + ".png");

		// Activate start game button if this is the second player to join the this.game.
		if(this.numPlayersInGame == 2) {
			this.activateStartGameButton();
		}
	},

	activateStartGameButton: function() {
		// this.minPlayerMessage.visible = false;
		// this.startGameButton.setFrames("lobby/buttons/start_game_button_02.png", "lobby/buttons/start_game_button_01.png");
		// this.startGameButton.onInputUp.removeAll();

		this.startGameButton.clear();
		this.startGameButton.beginFill(0xaa2222, 1);
		this.startGameButton.drawRoundedRect(0,0, this.game.width/5, this.game.height/13, 10)
		this.startGameButton.inputEnabled = true;
		this.startGameButton.events.onInputDown.add(this.startGameAction, this);
		// this.startGameButton.setDownSound(buttonClickSound);
	},

	deactivateStartGameButton: function() {
		// this.minPlayerMessage.visible = true;
		// this.startGameButton.setFrames("lobby/buttons/start_game_button_03.png", "lobby/buttons/start_game_button_03.png");
		// this.startGameButton.onInputUp.removeAll();
		// this.startGameButton.setDownSound(null);
		this.startGameButton.clear();
		this.startGameButton.beginFill(0x888888, 1);
		this.startGameButton.drawRoundedRect(0,0, this.game.width/5, this.game.height/13, 10)
		this.startGameButton.inputEnabled = false;
	},

	playerLeft: function(data) {
		this.numPlayersInGame--;

		if(this.numPlayersInGame == 1) {
			this.deactivateStartGameButton();
		}

		for(var playerId in this.characterImages) {
			this.characterImages[playerId].destroy();
		}
		this.populateCharacterSquares(data);
	},

	// When the "start" button is clicked, send a message to the server to initialize the this.game.
	startGameAction: function() {
		socket.emit("start game on server");
	},

	leaveGameAction: function() {
		socket.emit("leave pending game");
		socket.removeAllListeners();
		LunarAdventure.game.state.start("Lobby", true, false);
	},

	startGame: function(data) {
		socket.removeAllListeners();
		LunarAdventure.game.state.start("Game", true, false, data.mapName, data.players, this.id);
	}
}
LunarAdventure.Lobby = function(){};

LunarAdventure.Lobby.prototype = {
	create: function() {
		this.stateSettings = {
			empty: {
				text: "Host Game ",
				callback: this.hostGameAction
			},
			joinable: {
				text: "Join Game ",
				callback: this.joinGameAction
			},
			settingup: {
				text: "Game is being set up... ",
				callback: null
			},
			inprogress: {
				text: "Game in Progress ",
				callback: null
			},
			full: {
				text: "Game Full ",
				callback: null
			}
		};

		this.background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'starfield');

		var board = this.game.add.graphics();
		board.beginFill(0x333, 0.5);
		board.drawRoundedRect(this.game.width/6, this.game.height/10 * 1.5, this.game.width/6 * 4, this.game.height/10 * 8, 15)
		board.endFill()

		var heading = this.game.add.text(this.game.width/2, this.game.height/10, "Lobby", textStyle(this.game.height/15, 'black'));
		heading.anchor.set(0.5);
		
		this.slots = [];
		this.labels = [];

		// var gameData = [{state: "empty"}, {state: "empty"}, {state: "joinable"}, {state: "insession"}];

		socket.emit("enter lobby");
		socket.on("add slots", this.addSlots.bind(this));
		socket.on("update slot", this.updateSlot.bind(this));
	},

	addSlots: function(gameData) {
		if(this.slots.length > 0) return;

		for(var i = 0; i < gameData.length; i++) {
			var state = gameData[i].state;
			var settings = this.stateSettings[state];

			var bar = this.game.add.graphics();
			bar.beginFill(0xffffff, 0.8);
			bar.drawRoundedRect(this.game.width/3, this.game.height/10 * (i+2), this.game.width/3 , this.game.height/15, 10)
			bar.endFill()
			bar.inputEnabled = true;
			bar.events.onInputDown.add(settings.callback, {gameId: i})

			var text = this.game.add.text(this.game.width/2, this.game.height/10 * (i+2) + 5, settings.text, textStyle(this.game.height/25, 'black'));
			text.anchor.setTo(.5, 0);

			this.slots[i] = bar;
			this.labels[i] = text;
		}
	},

	hostGameAction: function(gameId) {
		socket.emit("host game", {gameId: this.gameId});
		socket.removeAllListeners();
		LunarAdventure.game.state.start("Gameroom", true, false, this.gameId);
	},

	joinGameAction: function(gameId) {
		socket.removeAllListeners();
		LunarAdventure.game.state.start("Gameroom", true, false, this.gameId);
	},

	updateSlot: function(updateInfo) {
		var settings = this.stateSettings[updateInfo.newState];
		var id = updateInfo.gameId;
		var button = this.slots[id];

		this.labels[id].setText(settings.text);

		// Change callback of button
		button.events.onInputDown.removeAll();
		if (!!settings.callback) {
			button.events.onInputDown.add(settings.callback, {gameId: id})
		}
	}
};
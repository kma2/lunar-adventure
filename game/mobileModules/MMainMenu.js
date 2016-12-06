LunarAdventure.MMainMenu = function(){};

// let putHasRun = false, submitBtnClicked = false, userName, input = null, achievedHighScore = false;

LunarAdventure.MMainMenu.prototype = {
	create: function() {

		gameWidth = this.world.width;
		gameHeight = this.world.height;
		putHasRun = false, submitBtnClicked = false, userName, input = null, achievedHighScore = false;
		centerX = gameWidth * 0.5
		centerY = gameHeight + 500
		cursors = this.input.keyboard.createCursorKeys();

		this.physics.startSystem(Phaser.Physics.P2JS);

		this.background = this.game.add.tileSprite(0, 0, 1300, 900, 'starfield');

		astronaut = this.add.sprite(width * 0.4545 + 20, height * 0.1667, 'astronaut');
		astronaut.scale.setTo(0.5, 0.5);

		logo = this.add.sprite(width * 0.3333 - 20, height * 0.3333, 'logo');
		logo.scale.setTo(0.8, 0.8);

		// creating static terrain
		terrain = this.add.sprite(width * 0.5, height + 500, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

		let singlePlayer = this.game.add.text(width * 0.4545, height * 0.4348, 'Tap to play', textStyle(height * 0.0333, 'white'));
		singlePlayer.inputEnabled = true;
		singlePlayer.events.onInputDown.add(this.startSinglePlayer, this);

		this.physics.p2.setBoundsToWorld(true, true, true, true, true);
	},

	update: function() {
		terrain.body.rotation -= 0.003;

		if (this.game.input.activePointer.justPressed()) this.game.state.start('MGame');
	},

	startSinglePlayer: function() {
		this.game.state.start('MGame');
	},
};

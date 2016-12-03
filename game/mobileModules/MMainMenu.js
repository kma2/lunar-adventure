LunarAdventure.MMainMenu = function(){};

// let putHasRun = false, submitBtnClicked = false, userName, input = null, achievedHighScore = false;

LunarAdventure.MMainMenu.prototype = {
	create: function() {

		gameWidth = this.world.width;
		gameHeight = this.world.height;
		putHasRun = false, submitBtnClicked = false, userName, input = null, achievedHighScore = false;
		centerX = gameWidth/2
		centerY = gameHeight + 500
		cursors = this.input.keyboard.createCursorKeys();

		this.physics.startSystem(Phaser.Physics.P2JS);

		// this.background = this.game.add.tileSprite(0, 0, width, height, 'starfield');
		this.background = this.game.add.tileSprite(0, 0, 1300, 900, 'starfield');


		// astronaut = this.add.sprite(width/2 - 50, height/4.5, 'astronaut');
		astronaut = this.add.sprite(width/2.2 + 20, height/6, 'astronaut');
		astronaut.scale.setTo(0.5, 0.5);

		// logo = this.add.sprite(width/2 - 240, height/2.5, 'logo');
		logo = this.add.sprite(width/3 - 20, height/3, 'logo');
		logo.scale.setTo(0.8, 0.8);

		// creating static terrain
		terrain = this.add.sprite(width/2, height + 500, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

		let singlePlayer = this.game.add.text(width/2.2, height/2.3, 'Tap to play', textStyle(height/30, 'white'));
		singlePlayer.inputEnabled = true;
		singlePlayer.events.onInputDown.add(this.startSinglePlayer, this);

		this.physics.p2.setBoundsToWorld(true, true, true, true, true);
	},

	update: function() {
		terrain.body.rotation -= 0.003;
		this.background.tilePosition.x += 0.2;
		this.background.tilePosition.y -= 0.2;

		if (this.game.input.activePointer.justPressed()) this.game.state.start('MGame');
	},

	startSinglePlayer: function() {
		this.game.state.start('MGame');
	},
};

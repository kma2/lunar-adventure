LunarAdventure.MainMenu = function(){};

// global variables
let putHasRun, submitBtnClicked, userName, formInput, achievedHighScore;

LunarAdventure.MainMenu.prototype = {
	create: function() {

		// reset global variables
		putHasRun = false, submitBtnClicked = false, userName, formInput = null, achievedHighScore = false;

		// ======== set up game world ========
		gameWidth = this.world.width;
		gameHeight = this.world.height;
		centerX = gameWidth * 0.5;
		centerY = gameHeight + 500;
		cursors = this.input.keyboard.createCursorKeys();

		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);
		this.background = this.game.add.tileSprite(0, 0, 1300, 900, 'starfield');


		// ======== add assets and text ========
		astronaut = this.add.sprite(width * 0.4545 + 15, height * 0.2, 'astronaut');
		astronaut.scale.setTo(0.5, 0.5);

		logo = this.add.sprite(width * 0.3333 - 20, height * 0.3333, 'logo');
		logo.scale.setTo(0.8, 0.8);

		// creating static terrain
		terrain = this.add.sprite(width * 0.5, height + 500, 'terrain');
		terrain.anchor.set(0.5);
		this.physics.p2.enable(terrain, false);
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

		let style = { font: '16pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 410 };

		let singlePlayer = this.game.add.text(width * 0.3846, height * 0.4348, 'Single player', style);
		singlePlayer.inputEnabled = true;
		singlePlayer.events.onInputDown.add(this.startSinglePlayer, this);

		let cooperative = this.game.add.text(width * 0.5405, height * 0.4348, 'Cooperative', style);
		cooperative.inputEnabled = true;
		cooperative.events.onInputDown.add(this.startCooperative, this);

		let howToPlay = this.game.add.text(width * 0.4545 + 15, height * 0.5, 'How to play', style);
		howToPlay.inputEnabled = true;
		howToPlay.events.onInputDown.add(this.showHowToPlay, this);
	},

	update: function() {
		terrain.body.rotation -= 0.003;
		// this.background.tilePosition.x += 0.2;
		// this.background.tilePosition.y -= 0.2;

	},

	startSinglePlayer: function() {
		this.game.state.start('Game');
	},

	startCooperative: function() {
		this.game.state.start('Cooperative');
	},

	showHowToPlay: function() {
		this.game.state.start('HowToPlay');
	}
};

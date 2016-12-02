LunarAdventure.MultiSuccess = function(){};

text = null;

LunarAdventure.MultiSuccess.prototype = {
	create: function() {


		this.physics.startSystem(Phaser.Physics.P2JS);

		this.background = this.game.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');

		//new dynamic text
		this.game.debug.text(`Perfect landing! Your time is ${successGlobalTime} seconds!`, gameWidth/2.3 - 96, this.game.height/3.2);


		// creating static terrain
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

		this.game.debug.text('click to play again', gameWidth/2 - 85, gameHeight/2.5);

	},

	update: function() {
		terrain.body.rotation -= 0.003;

		if(this.game.input.activePointer.justPressed()) {
			this.game.state.start('MainMenu');
		}
	}
};

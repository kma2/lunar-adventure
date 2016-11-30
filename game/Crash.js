LunarAdventure.Crash = function(){};

LunarAdventure.Crash.prototype = {
	create: function() {

		this.physics.startSystem(Phaser.Physics.P2JS);
		this.background = this.game.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');

		message = this.add.sprite(gameWidth/2 - 210, gameHeight/3.2, 'crash');
		message.scale.setTo(0.6, 0.6);

		// creating static terrain
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

		this.game.debug.text('click to play again', gameWidth/2 - 85, gameHeight/2.3);
	},
	update: function() {
		terrain.body.rotation -= 0.003;

		if(this.game.input.activePointer.justPressed()) {
			this.game.state.start('MainMenu');
		}
	}
};

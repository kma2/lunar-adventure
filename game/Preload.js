var LunarAdventure = LunarAdventure || {};

//loading the game assets
LunarAdventure.Preload = function(){};

LunarAdventure.Preload.prototype = {
	preload: function() {

	// loading progress bar
	// this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
	// this.preloadBar.anchor.setTo(0.5);
	// this.load.setPreloadSprite(this.preloadBar);

	//load game assets
	this.load.image('astronaut', 'images/TheAstronautWhite.png');
	this.load.image('logo', 'images/logo.png');
	// this.load.image('ship', 'images/rocket.png');
	this.load.image('ship', 'images/new_rocket.png');
	this.load.image('explosion', 'images/explosion.png');
	this.load.physics('tracedTerrain', 'terrainPolygon.json');
	this.load.image('terrain', 'images/terrain2.png');
	this.load.image('starfield', 'images/starfield.png');
	this.load.image('landingPad', 'images/landingPad.png');
	this.load.image('crash', 'images/crash_message.png');
	this.load.image('success', 'images/success_message.png');
	this.load.image('submitBtn', 'images/submitButton.png');

	// obstacles
	this.load.image('tinyObstacle', 'images/tinyObstacle.png');
	this.load.image('smallObstacle', 'images/smallObstacle.png');
	this.load.image('mediumObstacle', 'images/mediumObstacle.png');
	this.load.image('largeObstacle', 'images/largeObstacle.png');
	this.load.image('penalty10', 'images/penalty10.png');
	this.load.image('penalty5', 'images/penalty5.png')
	this.load.image('boundary', 'images/boundary.png');

	// UI
	this.load.image('leftKeyUp', 'images/keyUI/leftUnpressed.png');
	this.load.image('leftKeyDown', 'images/keyUI/leftPressed.png');
	this.load.image('rightKeyUp', 'images/keyUI/rightUnpressed.png');
	this.load.image('rightKeyDown', 'images/keyUI/rightPressed.png');
	this.load.image('upKeyUp', 'images/keyUI/upUnpressed.png');
	this.load.image('upKeyDown', 'images/keyUI/upPressed.png');

	// A-Z
	this.loadKeyImage.call(this, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

	// UI key labels
	this.load.image('landingArrow', 'images/landingArrow.png');
	this.load.image('thrust', 'images/thrustUI.png');
	this.load.image('rotateL', 'images/rotateLeftUI.png');
	this.load.image('rotateR', 'images/rotateRightUI.png');

	// multiplayer
	this.load.image('W_upKeyUp', 'images/W_upKeyUp.png');
	this.load.image('W_upKeyDown', 'images/W_upKeyDown.png');
	},
	loadKeyImage: function(arr) {
		arr.forEach(char => {
			this.load.image(`upKeyLetter${char}Pressed`, `images/keyUI/${char}UpPressed.png`);
			this.load.image(`upKeyLetter${char}Unpressed`, `images/keyUI/${char}UpUnpressed.png`);
			this.load.image(`rightKeyLetter${char}Pressed`, `images/keyUI/${char}RightPressed.png`);
			this.load.image(`rightKeyLetter${char}Unpressed`, `images/keyUI/${char}RightUnpressed.png`);
			this.load.image(`leftKeyLetter${char}Pressed`, `images/keyUI/${char}LeftPressed.png`);
			this.load.image(`leftKeyLetter${char}Unpressed`, `images/keyUI/${char}LeftUnpressed.png`);
		})
	},
	create: function() {
	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.pageAlignHorizontally = true;
	this.state.start('MainMenu');
	}
};

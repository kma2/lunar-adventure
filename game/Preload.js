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
    this.load.image('ship', 'images/rocket.png');
		this.load.image('explosion', 'images/explosion.png');
		this.load.physics('tracedTerrain', 'terrainPolygon.json');
    this.load.image('terrain', 'images/terrain2.png');
    this.load.image('starfield', 'images/starfield.png');
    this.load.image('landingPad', 'images/landingPad.png');
    this.load.image('crash', 'images/crash_message.png');
    this.load.image('success', 'images/success_message.png');

    // obstacles
    this.load.image('tinyObstacle', 'images/tinyObstacle.png');
    this.load.image('smallObstacle', 'images/smallObstacle.png');
    this.load.image('mediumObstacle', 'images/mediumObstacle.png');
    this.load.image('largeObstacle', 'images/largeObstacle.png');
    this.load.image('penalty10', 'images/penalty10.png');
    this.load.image('penalty5', 'images/penalty5.png')
    this.load.image('boundary', 'images/boundary.png');

    // UI
    this.load.image('leftKeyUp', 'images/leftKeyUp.png');
    this.load.image('leftKeyDown', 'images/leftKeyDown.png');
    this.load.image('rightKeyUp', 'images/rightKeyUp.png');
    this.load.image('rightKeyDown', 'images/rightKeyDown.png');
    this.load.image('upKeyUp', 'images/upKeyUp.png');
    this.load.image('upKeyDown', 'images/upKeyDown.png');
    this.load.image('landingArrow', 'images/landingArrow.png');
    this.load.image('thrust', 'images/thrustUI.png');
    this.load.image('rotateL', 'images/rotateLeftUI.png');
    this.load.image('rotateR', 'images/rotateRightUI.png');

  },

  create: function() {
  	this.state.start('MainMenu');
  }
};

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
    this.load.image('terrain', 'images/terrain1.png');
    this.load.image('starfield', 'images/starfield.png');
    this.load.image('landingPad', 'images/landingPad.png');
    this.load.image('crash', 'images/crash_message.png');
    this.load.image('success', 'images/success_message.png');
  },

  create: function() {
  	this.state.start('MainMenu');
  }
};

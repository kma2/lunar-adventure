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
  	this.load.image('wallpaper', 'images/terrainPattern.png');
    this.load.image('astronaut', 'images/TheAstronautWhite.png');
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};

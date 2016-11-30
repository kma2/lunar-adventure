var LunarAdventure = LunarAdventure || {};

//loading the game assets
LunarAdventure.Boot = function(){};

LunarAdventure.Boot.prototype = {
  preload: function() {
  	// this.game.scale.maxWidth = 800;
  	// this.game.scale.maxHeight = 600;
  },

  create: function() {
    // this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.game.scale.pageAlignHorizontally = true;
    // this.game.scale.pageAlignVertically = true;
    // this.game.scale.setScreenSize();

  	this.state.start('Preload');
  }
};
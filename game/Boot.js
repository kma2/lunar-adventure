var LunarAdventure = LunarAdventure || {};

LunarAdventure.Boot = function(){};

LunarAdventure.Boot.prototype = {
  create: function() {
  	this.game.physics.startSystem(Phaser.Physics.P2);
    this.state.start('Preload');
    }
};

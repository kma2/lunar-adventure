// This is where we will have our preload screen

var LunarAdventure = LunarAdventure || {};

LunarAdventure.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
LunarAdventure.Boot.prototype = {
  preload: function() {
  	//example assets we'll use in the loading screen
    this.load.image('logo', 'images/TheAstronautWhite.png');
    // this.load.image('preloadbar', 'images/preloader-bar.png');
  },
  create: function() {
    console.log(this);
  	//loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //scaling options
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.minWidth = 240;
	this.scale.minHeight = 170;
	this.scale.maxWidth = 2880;
	this.scale.maxHeight = 1920;

	//have the game centered horizontally
	this.scale.pageAlignHorizontally = true;

	//screen size will be set automatically
	// this.scale.setScreenSize(true);

	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.P2);

    this.state.start('Preload');
  }
};
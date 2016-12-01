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

  // HEALTHBAR UI
  this.load.image('fullHealth', 'images/fullHealthBar.png');
  this.load.image('twoHealth', 'images/twoHealthBar.png');
  this.load.image('oneHealth', 'images/oneHealthBar.png');
  this.load.image('emptyHealth', 'images/emptyHealthBar.png');
  this.load.image('invulnerable', 'images/Invulnerable.png');


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
    //A
    this.load.image('upKeyLetterAPressed', 'images/keyUI/AUpPressed.png');
    this.load.image('upKeyLetterAUnpressed', 'images/keyUI/AUpUnpressed.png');
    this.load.image('rightKeyLetterAPressed', 'images/keyUI/ARightPressed.png');
    this.load.image('rightKeyLetterAUnpressed', 'images/keyUI/ARightUnpressed.png');
    this.load.image('leftKeyLetterAPressed', 'images/keyUI/ALeftPressed.png');
    this.load.image('leftKeyLetterAUnpressed', 'images/keyUI/ALeftUnpressed.png');
    // B
    this.load.image('upKeyLetterBPressed', 'images/keyUI/BUpPressed.png');
    this.load.image('upKeyLetterBUnpressed', 'images/keyUI/BUpUnpressed.png');
    this.load.image('rightKeyLetterBPressed', 'images/keyUI/BRightPressed.png');
    this.load.image('rightKeyLetterBUnpressed', 'images/keyUI/BRightUnpressed.png');
    this.load.image('leftKeyLetterBPressed', 'images/keyUI/BLeftPressed.png');
    this.load.image('leftKeyLetterBUnpressed', 'images/keyUI/BLeftUnpressed.png');
    // C
    this.load.image('upKeyLetterCPressed', 'images/keyUI/CUpPressed.png');
    this.load.image('upKeyLetterCUnpressed', 'images/keyUI/CUpUnpressed.png');
    this.load.image('rightKeyLetterCPressed', 'images/keyUI/CRightPressed.png');
    this.load.image('rightKeyLetterCUnpressed', 'images/keyUI/CRightUnpressed.png');
    this.load.image('leftKeyLetterCPressed', 'images/keyUI/CLeftPressed.png');
    this.load.image('leftKeyLetterCUnpressed', 'images/keyUI/CLeftUnpressed.png');
    // D
    this.load.image('upKeyLetterDPressed', 'images/keyUI/DUpPressed.png');
    this.load.image('upKeyLetterDUnpressed', 'images/keyUI/DUpUnpressed.png');
    this.load.image('rightKeyLetterDPressed', 'images/keyUI/DRightPressed.png');
    this.load.image('rightKeyLetterDUnpressed', 'images/keyUI/DRightUnpressed.png');
    this.load.image('leftKeyLetterDPressed', 'images/keyUI/DLeftPressed.png');
    this.load.image('leftKeyLetterDUnpressed', 'images/keyUI/DLeftUnpressed.png');
    // E
    this.load.image('upKeyLetterEPressed', 'images/keyUI/EUpPressed.png');
    this.load.image('upKeyLetterEUnpressed', 'images/keyUI/EUpUnpressed.png');
    this.load.image('rightKeyLetterEPressed', 'images/keyUI/ERightPressed.png');
    this.load.image('rightKeyLetterEUnpressed', 'images/keyUI/ERightUnpressed.png');
    this.load.image('leftKeyLetterEPressed', 'images/keyUI/ELeftPressed.png');
    this.load.image('leftKeyLetterEUnpressed', 'images/keyUI/ELeftUnpressed.png');
    // F
    this.load.image('upKeyLetterFPressed', 'images/keyUI/FUpPressed.png');
    this.load.image('upKeyLetterFUnpressed', 'images/keyUI/FUpUnpressed.png');
    this.load.image('rightKeyLetterFPressed', 'images/keyUI/FRightPressed.png');
    this.load.image('rightKeyLetterFUnpressed', 'images/keyUI/FRightUnpressed.png');
    this.load.image('leftKeyLetterFPressed', 'images/keyUI/FLeftPressed.png');
    this.load.image('leftKeyLetterFUnpressed', 'images/keyUI/FLeftUnpressed.png');
    // G
    this.load.image('upKeyLetterGPressed', 'images/keyUI/GUpPressed.png');
    this.load.image('upKeyLetterGUnpressed', 'images/keyUI/GUpUnpressed.png');
    this.load.image('rightKeyLetterGPressed', 'images/keyUI/GRightPressed.png');
    this.load.image('rightKeyLetterGUnpressed', 'images/keyUI/GRightUnpressed.png');
    this.load.image('leftKeyLetterGPressed', 'images/keyUI/GLeftPressed.png');
    this.load.image('leftKeyLetterGUnpressed', 'images/keyUI/GLeftUnpressed.png');
    // H
    this.load.image('upKeyLetterHPressed', 'images/keyUI/HUpPressed.png');
    this.load.image('upKeyLetterHUnpressed', 'images/keyUI/HUpUnpressed.png');
    this.load.image('rightKeyLetterHPressed', 'images/keyUI/HRightPressed.png');
    this.load.image('rightKeyLetterHUnpressed', 'images/keyUI/HRightUnpressed.png');
    this.load.image('leftKeyLetterHPressed', 'images/keyUI/HLeftPressed.png');
    this.load.image('leftKeyLetterHUnpressed', 'images/keyUI/HLeftUnpressed.png');
    // I
    this.load.image('upKeyLetterIPressed', 'images/keyUI/IUpPressed.png');
    this.load.image('upKeyLetterIUnpressed', 'images/keyUI/IUpUnpressed.png');
    this.load.image('rightKeyLetterIPressed', 'images/keyUI/IRightPressed.png');
    this.load.image('rightKeyLetterIUnpressed', 'images/keyUI/IRightUnpressed.png');
    this.load.image('leftKeyLetterIPressed', 'images/keyUI/ILeftPressed.png');
    this.load.image('leftKeyLetterIUnpressed', 'images/keyUI/ILeftUnpressed.png');
    // J
    this.load.image('upKeyLetterJPressed', 'images/keyUI/JUpPressed.png');
    this.load.image('upKeyLetterJUnpressed', 'images/keyUI/JUpUnpressed.png');
    this.load.image('rightKeyLetterJPressed', 'images/keyUI/JRightPressed.png');
    this.load.image('rightKeyLetterJUnpressed', 'images/keyUI/JRightUnpressed.png');
    this.load.image('leftKeyLetterJPressed', 'images/keyUI/JLeftPressed.png');
    this.load.image('leftKeyLetterJUnpressed', 'images/keyUI/JLeftUnpressed.png');
    // K
    this.load.image('upKeyLetterKPressed', 'images/keyUI/KUpPressed.png');
    this.load.image('upKeyLetterKUnpressed', 'images/keyUI/KUpUnpressed.png');
    this.load.image('rightKeyLetterKPressed', 'images/keyUI/KRightPressed.png');
    this.load.image('rightKeyLetterKUnpressed', 'images/keyUI/KRightUnpressed.png');
    this.load.image('leftKeyLetterKPressed', 'images/keyUI/KLeftPressed.png');
    this.load.image('leftKeyLetterKUnpressed', 'images/keyUI/KLeftUnpressed.png');
    // L
    this.load.image('upKeyLetterLPressed', 'images/keyUI/LUpPressed.png');
    this.load.image('upKeyLetterLUnpressed', 'images/keyUI/LUpUnpressed.png');
    this.load.image('rightKeyLetterLPressed', 'images/keyUI/LRightPressed.png');
    this.load.image('rightKeyLetterLUnpressed', 'images/keyUI/LRightUnpressed.png');
    this.load.image('leftKeyLetterLPressed', 'images/keyUI/LLeftPressed.png');
    this.load.image('leftKeyLetterLUnpressed', 'images/keyUI/LLeftUnpressed.png');
    // M
    this.load.image('upKeyLetterMPressed', 'images/keyUI/MUpPressed.png');
    this.load.image('upKeyLetterMUnpressed', 'images/keyUI/MUpUnpressed.png');
    this.load.image('rightKeyLetterMPressed', 'images/keyUI/MRightPressed.png');
    this.load.image('rightKeyLetterMUnpressed', 'images/keyUI/MRightUnpressed.png');
    this.load.image('leftKeyLetterMPressed', 'images/keyUI/MLeftPressed.png');
    this.load.image('leftKeyLetterMUnpressed', 'images/keyUI/MLeftUnpressed.png');
    // N
    this.load.image('upKeyLetterNPressed', 'images/keyUI/NUpPressed.png');
    this.load.image('upKeyLetterNUnpressed', 'images/keyUI/NUpUnpressed.png');
    this.load.image('rightKeyLetterNPressed', 'images/keyUI/NRightPressed.png');
    this.load.image('rightKeyLetterNUnpressed', 'images/keyUI/NRightUnpressed.png');
    this.load.image('leftKeyLetterNPressed', 'images/keyUI/NLeftPressed.png');
    this.load.image('leftKeyLetterNUnpressed', 'images/keyUI/NLeftUnpressed.png');
    // O
    this.load.image('upKeyLetterOPressed', 'images/keyUI/OUpPressed.png');
    this.load.image('upKeyLetterOUnpressed', 'images/keyUI/OUpUnpressed.png');
    this.load.image('rightKeyLetterOPressed', 'images/keyUI/ORightPressed.png');
    this.load.image('rightKeyLetterOUnpressed', 'images/keyUI/ORightUnpressed.png');
    this.load.image('leftKeyLetterOPressed', 'images/keyUI/OLeftPressed.png');
    this.load.image('leftKeyLetterOUnpressed', 'images/keyUI/OLeftUnpressed.png');
    // P
    this.load.image('upKeyLetterPPressed', 'images/keyUI/PUpPressed.png');
    this.load.image('upKeyLetterPUnpressed', 'images/keyUI/PUpUnpressed.png');
    this.load.image('rightKeyLetterPPressed', 'images/keyUI/PRightPressed.png');
    this.load.image('rightKeyLetterPUnpressed', 'images/keyUI/PRightUnpressed.png');
    this.load.image('leftKeyLetterPPressed', 'images/keyUI/PLeftPressed.png');
    this.load.image('leftKeyLetterPUnpressed', 'images/keyUI/PLeftUnpressed.png');
    // Q
    this.load.image('upKeyLetterQPressed', 'images/keyUI/QUpPressed.png');
    this.load.image('upKeyLetterQUnpressed', 'images/keyUI/QUpUnpressed.png');
    this.load.image('rightKeyLetterQPressed', 'images/keyUI/QRightPressed.png');
    this.load.image('rightKeyLetterQUnpressed', 'images/keyUI/QRightUnpressed.png');
    this.load.image('leftKeyLetterQPressed', 'images/keyUI/QLeftPressed.png');
    this.load.image('leftKeyLetterQUnpressed', 'images/keyUI/QLeftUnpressed.png');
    // R
    this.load.image('upKeyLetterRPressed', 'images/keyUI/RUpPressed.png');
    this.load.image('upKeyLetterRUnpressed', 'images/keyUI/RUpUnpressed.png');
    this.load.image('rightKeyLetterRPressed', 'images/keyUI/RRightPressed.png');
    this.load.image('rightKeyLetterRUnpressed', 'images/keyUI/RRightUnpressed.png');
    this.load.image('leftKeyLetterRPressed', 'images/keyUI/RLeftPressed.png');
    this.load.image('leftKeyLetterRUnpressed', 'images/keyUI/RLeftUnpressed.png');
    // S
    this.load.image('upKeyLetterSPressed', 'images/keyUI/SUpPressed.png');
    this.load.image('upKeyLetterSUnpressed', 'images/keyUI/SUpUnpressed.png');
    this.load.image('rightKeyLetterSPressed', 'images/keyUI/SRightPressed.png');
    this.load.image('rightKeyLetterSUnpressed', 'images/keyUI/SRightUnpressed.png');
    this.load.image('leftKeyLetterSPressed', 'images/keyUI/SLeftPressed.png');
    this.load.image('leftKeyLetterSUnpressed', 'images/keyUI/SLeftUnpressed.png');
    // T
    this.load.image('upKeyLetterTPressed', 'images/keyUI/TUpPressed.png');
    this.load.image('upKeyLetterTUnpressed', 'images/keyUI/TUpUnpressed.png');
    this.load.image('rightKeyLetterTPressed', 'images/keyUI/TRightPressed.png');
    this.load.image('rightKeyLetterTUnpressed', 'images/keyUI/TRightUnpressed.png');
    this.load.image('leftKeyLetterTPressed', 'images/keyUI/TLeftPressed.png');
    this.load.image('leftKeyLetterTUnpressed', 'images/keyUI/TLeftUnpressed.png');
    // U
    this.load.image('upKeyLetterUPressed', 'images/keyUI/UUpPressed.png');
    this.load.image('upKeyLetterUUnpressed', 'images/keyUI/UUpUnpressed.png');
    this.load.image('rightKeyLetterUPressed', 'images/keyUI/URightPressed.png');
    this.load.image('rightKeyLetterUUnpressed', 'images/keyUI/URightUnpressed.png');
    this.load.image('leftKeyLetterUPressed', 'images/keyUI/ULeftPressed.png');
    this.load.image('leftKeyLetterUUnpressed', 'images/keyUI/ULeftUnpressed.png');
    // V
    this.load.image('upKeyLetterVPressed', 'images/keyUI/VUpPressed.png');
    this.load.image('upKeyLetterVUnpressed', 'images/keyUI/VUpUnpressed.png');
    this.load.image('rightKeyLetterVPressed', 'images/keyUI/VRightPressed.png');
    this.load.image('rightKeyLetterVUnpressed', 'images/keyUI/VRightUnpressed.png');
    this.load.image('leftKeyLetterVPressed', 'images/keyUI/VLeftPressed.png');
    this.load.image('leftKeyLetterVUnpressed', 'images/keyUI/VLeftUnpressed.png');
    // W
    this.load.image('upKeyLetterWPressed', 'images/keyUI/WUpPressed.png');
    this.load.image('upKeyLetterWUnpressed', 'images/keyUI/WUpUnpressed.png');
    this.load.image('rightKeyLetterWPressed', 'images/keyUI/WRightPressed.png');
    this.load.image('rightKeyLetterWUnpressed', 'images/keyUI/WRightUnpressed.png');
    this.load.image('leftKeyLetterWPressed', 'images/keyUI/WLeftPressed.png');
    this.load.image('leftKeyLetterWUnpressed', 'images/keyUI/WLeftUnpressed.png');
    // X
    this.load.image('upKeyLetterXPressed', 'images/keyUI/XUpPressed.png');
    this.load.image('upKeyLetterXUnpressed', 'images/keyUI/XUpUnpressed.png');
    this.load.image('rightKeyLetterXPressed', 'images/keyUI/XRightPressed.png');
    this.load.image('rightKeyLetterXUnpressed', 'images/keyUI/XRightUnpressed.png');
    this.load.image('leftKeyLetterXPressed', 'images/keyUI/XLeftPressed.png');
    this.load.image('leftKeyLetterXUnpressed', 'images/keyUI/XLeftUnpressed.png');
    // Y
    this.load.image('upKeyLetterYPressed', 'images/keyUI/YUpPressed.png');
    this.load.image('upKeyLetterYUnpressed', 'images/keyUI/YUpUnpressed.png');
    this.load.image('rightKeyLetterYPressed', 'images/keyUI/YRightPressed.png');
    this.load.image('rightKeyLetterYUnpressed', 'images/keyUI/YRightUnpressed.png');
    this.load.image('leftKeyLetterYPressed', 'images/keyUI/YLeftPressed.png');
    this.load.image('leftKeyLetterYUnpressed', 'images/keyUI/YLeftUnpressed.png');
    // Z
    this.load.image('upKeyLetterZPressed', 'images/keyUI/ZUpPressed.png');
    this.load.image('upKeyLetterZUnpressed', 'images/keyUI/ZUpUnpressed.png');
    this.load.image('rightKeyLetterZPressed', 'images/keyUI/ZRightPressed.png');
    this.load.image('rightKeyLetterZUnpressed', 'images/keyUI/ZRightUnpressed.png');
    this.load.image('leftKeyLetterZPressed', 'images/keyUI/ZLeftPressed.png');
    this.load.image('leftKeyLetterZUnpressed', 'images/keyUI/ZLeftUnpressed.png');

    // UI key labels
    this.load.image('landingArrow', 'images/landingArrow.png');
    this.load.image('thrust', 'images/thrustUI.png');
    this.load.image('rotateL', 'images/rotateLeftUI.png');
    this.load.image('rotateR', 'images/rotateRightUI.png');

	// multiplayer
	this.load.image('W_upKeyUp', 'images/W_upKeyUp.png');
	this.load.image('W_upKeyDown', 'images/W_upKeyDown.png');
  },

  create: function() {
	this.state.start('MainMenu');
  }
};

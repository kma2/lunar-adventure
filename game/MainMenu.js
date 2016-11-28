LunarAdventure.MainMenu = function(){};

LunarAdventure.MainMenu.prototype = {
  create: function() {

    this.physics.startSystem(Phaser.Physics.P2JS);

    this.background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'starfield');

    astronaut = this.add.sprite(window.innerWidth/2 - 50, this.game.height/4.5, 'astronaut');
    astronaut.scale.setTo(0.5, 0.5);

    logo = this.add.sprite(window.innerWidth/2 - 240, this.game.height/2.5, 'logo');
    logo.scale.setTo(0.8, 0.8);

    // creating static terrain
		// terrain = this.add.sprite(window.innerWidth/2, window.innerHeight * 1.9, 'terrain');
    terrain = this.add.sprite(window.innerWidth/2, this.game.height/0.65 + 200, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

    this.game.debug.text('click to begin', this.game.width/2 - 70, this.game.height/1.9);
  },
  update: function() {
    terrain.body.rotation -= 0.003;

    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};

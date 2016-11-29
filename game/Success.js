LunarAdventure.Success = function(){};

let text = null;

LunarAdventure.Success.prototype = {
  create: function() {


    this.physics.startSystem(Phaser.Physics.P2JS);

    this.background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'starfield');

    //old success text
    // message = this.add.sprite(window.innerWidth/2 - 230, this.game.height/3, 'success');
    // message.scale.setTo(0.6, 0.6);

    //new dynamic text
    let timeElapsed = this.game.time.now.toString();
    let timeElapsedInSeconds = timeElapsed.slice(0, timeElapsed.length - 3);
    console.log('time is:', timeElapsedInSeconds)
    this.game.debug.text(`Perfect landing! Your time is ${timeElapsedInSeconds} seconds!`, this.game.width/2.5 - 20, this.game.height/2.6);


    // creating static terrain
		terrain = this.add.sprite(window.innerWidth/2, this.game.height/0.65 + 200, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

    this.game.debug.text('click to play again', this.game.width/2 - 85, this.game.height/2.1);
  },

  update: function() {
    terrain.body.rotation -= 0.003;

    if(this.game.input.activePointer.justPressed()) {
      this.game.time = 0
      this.game.state.start('Game');
    }
  }
};

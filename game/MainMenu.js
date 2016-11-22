LunarAdventure.MainMenu = function(){};

LunarAdventure.MainMenu.prototype = {
  create: function() {
  	//show the space tile, repeated
    // example
    this.background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'wallpaper');
    // //give it speed in x
    // this.background.autoScroll(-20, 0);

    // Here we can show the whole planet and obstacles as a background

    //start game text
    var text = "Tap to begin";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};
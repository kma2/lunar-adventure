LunarAdventure.MainMenu = function(){};

LunarAdventure.MainMenu.prototype = {
  create: function() {
    this.background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'wallpaper');
    this.splash = this.add.sprite(this.game.world.centerX - 100, this.game.world.centerY - 180, 'astronaut');

    var gameTitle = "Lunar Adventure";
    var gameTitleStyle = { font: "37px Arial", fill: "#fff", align: "center" };
    var heading = this.game.add.text(this.game.width/2, this.game.height/1.75, gameTitle, gameTitleStyle);
    heading.anchor.set(0.5);

    // Katy: bitmapText will render the text in higher quality, but I couldn't get it to work
    //var heading = this.game.add.bitmapText(this.game.width/2, this.game.height/1.75, "Arial", "Lunar Adventure", 37);

    var subtext = "Tap to begin";
    var subtextStyle = { font: "22px Arial", fill: "#fff", align: "center" };
    var text2 = this.game.add.text(this.game.width/2, this.game.height/1.55, subtext, subtextStyle);
    text2.anchor.set(0.5);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};

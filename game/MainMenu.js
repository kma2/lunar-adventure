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
    var text1 = this.game.add.text(this.game.width/2.3, this.game.height/1.4, subtext, subtextStyle);
    text1.anchor.set(0.5);
    text1.inputEnabled = true;
    text1.events.onInputDown.add(this.singlePlayer, this);

    var text2 = this.game.add.text(this.game.width/1.7, this.game.height/1.4, 'multiPlayer', subtextStyle);
    text2.anchor.set(0.5);
    text2.inputEnabled = true;
    text2.events.onInputDown.add(this.multiPlayer, this);

    this.game.add.plugin(Fabrique.Plugins.InputField);

    input = this.game.add.inputField(this.game.width/2.3, this.game.height/1.6, {
      font: '18px Arial',
      fill: '#212121',
      fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6
    });
    // this.game.input.keyboard.addCallbacks(this, null, null, keyPress);

  },
  singlePlayer: function() {
    this.game.state.start('Game')
  },
  multiPlayer: function() {
    // if (input.value) {
      thisUser = input.value;
      users.push(input.value)
      // socket.emit('multiPlayer', thisUser)
      this.game.state.start('Lobby')
    // }
  }
};

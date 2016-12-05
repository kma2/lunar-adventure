var LunarAdventure = LunarAdventure || {};

// global font style
var fontStyle = { font: "22px Asap", fill: "#fff"};

LunarAdventure.game = new Phaser.Game(1280,800, Phaser.AUTO);

// Google WebFont Loader
WebFontConfig = {
  google: {
    families: ['Asap'] //  we can load as many fonts as we want in the array
  }
};

// setup global variables
var textStyle = function(size, color) {
	var color = color === 'black' ? "#444" : "#ddd"
	return { font: `${size}px Arial`, fill: color, align: "center" }
};

let width = 1280;
let height = 800;

// setup game states
LunarAdventure.game.state.add('Preload', LunarAdventure.Preload);
LunarAdventure.game.state.add('HowToPlay', LunarAdventure.HowToPlay);
LunarAdventure.game.state.add('MainMenu', LunarAdventure.MainMenu);
LunarAdventure.game.state.add('SingleCrash', LunarAdventure.SingleCrash);
LunarAdventure.game.state.add('CoopCrash', LunarAdventure.CoopCrash);
LunarAdventure.game.state.add('SingleSuccess', LunarAdventure.SingleSuccess);
LunarAdventure.game.state.add('CoopSuccess', LunarAdventure.CoopSuccess);
LunarAdventure.game.state.add('Game', LunarAdventure.Game);
LunarAdventure.game.state.add('Cooperative', LunarAdventure.Cooperative);
LunarAdventure.game.state.add('Lobby', LunarAdventure.Lobby);
LunarAdventure.game.state.add('GameRoom', LunarAdventure.GameRoom);
LunarAdventure.game.state.add('MGame', LunarAdventure.MGame);
LunarAdventure.game.state.add('MMainMenu', LunarAdventure.MMainMenu);

// start game
LunarAdventure.game.state.start('Preload');

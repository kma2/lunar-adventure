var LunarAdventure = LunarAdventure || {};

//phaser accepts %s as well as pxs - 4th argument is a parent DOM element
LunarAdventure.game = new Phaser.Game(1280,800, Phaser.AUTO, 'phaser-game');

// setup global variables
var textStyle = function(size, color) {
	var color = color === 'black' ? "#444" : "#ddd"
	return { font: `${size}px Arial`, fill: color, align: "center" }
}
// var width = window.innerWidth;
let width = 1280;
//innerWidth is a number - currently 693. innerHeight is 557. just for ball parks
// console.log('inner width is:', window.innerHeight)
// var height = window.innerHeight;
let height = 800;

// setup game states
LunarAdventure.game.state.add('Preload', LunarAdventure.Preload);
LunarAdventure.game.state.add('MainMenu', LunarAdventure.MainMenu);
LunarAdventure.game.state.add('Crash', LunarAdventure.Crash);
LunarAdventure.game.state.add('Success', LunarAdventure.Success);
LunarAdventure.game.state.add('Game', LunarAdventure.Game);
LunarAdventure.game.state.add('Multiplayer', LunarAdventure.Multiplayer);
LunarAdventure.game.state.add('Lobby', LunarAdventure.Lobby);
LunarAdventure.game.state.add('GameRoom', LunarAdventure.GameRoom);

LunarAdventure.game.state.start('Preload');

var LunarAdventure = LunarAdventure || {};

LunarAdventure.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

var textStyle = function(size, color) {
	var color = color === 'black' ? "#444" : "#ddd"
	return { font: `${size}px Arial`, fill: color, align: "center" }
}

LunarAdventure.game.state.add('Boot', LunarAdventure.Boot);
LunarAdventure.game.state.add('Preload', LunarAdventure.Preload);
LunarAdventure.game.state.add('MainMenu', LunarAdventure.MainMenu);
LunarAdventure.game.state.add('Crash', LunarAdventure.Crash);
LunarAdventure.game.state.add('Success', LunarAdventure.Success);
LunarAdventure.game.state.add('Game', LunarAdventure.Game);
LunarAdventure.game.state.add('Lobby', LunarAdventure.Lobby);
LunarAdventure.game.state.add('Gameroom', LunarAdventure.Gameroom);

LunarAdventure.game.state.start('Boot');

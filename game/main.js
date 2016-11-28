var LunarAdventure = LunarAdventure || {};

LunarAdventure.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

LunarAdventure.game.state.add('Boot', LunarAdventure.Boot);
LunarAdventure.game.state.add('Preload', LunarAdventure.Preload);
LunarAdventure.game.state.add('MainMenu', LunarAdventure.MainMenu);
LunarAdventure.game.state.add('Crash', LunarAdventure.Crash);
LunarAdventure.game.state.add('Success', LunarAdventure.Success);
LunarAdventure.game.state.add('Game', LunarAdventure.Game);

LunarAdventure.game.state.start('Boot');

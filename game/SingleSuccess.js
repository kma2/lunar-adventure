// const axios = require('axios');
// import axios from 'axios';

LunarAdventure.SingleSuccess = function(){};

let text = null;

LunarAdventure.SingleSuccess.prototype = {
	create: function() {

		let highScores;

		fetch('/highScore/SinglePlayer')
		.then(res => res.json())
		.then(scoreList => {
			highScores = scoreList;
			this.game.debug.text(`Perfect landing! Your time is ${successGlobalTime} seconds!`, gameWidth/2.3 - 96, gameHeight/5.3);
			this.game.debug.text('click to play again', gameWidth/2 - 85, gameHeight/4);
			let yVal = gameHeight/3;
			for (var i = 0; i < highScores.length; i++) {
				// if (highScores[i].time.toString().length < 5)
				this.game.debug.text(`${highScores[i].time}  -  ${highScores[i].name}`, gameWidth/2 - 85, yVal)
				yVal += 30
			}
			// // input form
			// this.game.add.plugin(Fabrique.Plugins.InputField);
			// input = this.game.add.inputField(width/2.3, height/1.6, {
			// 	font: '18px Arial',
			// 	fill: '#212121',
			// 	fontWeight: 'bold',
			// 	width: 150,
			// 	padding: 8,
			// 	borderWidth: 1,
			// 	borderColor: '#000',
			// 	borderRadius: 6
			// });
		})
		.catch(err => console.error('error retrieving scores', err))

		this.physics.startSystem(Phaser.Physics.P2JS);

		this.background = this.game.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');


		// creating static terrain
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');


	},

	update: function() {
		terrain.body.rotation -= 0.003;

		if(this.game.input.activePointer.justPressed()) {
			this.game.state.start('MainMenu');
		}
	}
};

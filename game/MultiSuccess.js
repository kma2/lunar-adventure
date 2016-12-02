LunarAdventure.MultiSuccess = function(){};

text = null;

LunarAdventure.MultiSuccess.prototype = {
	create: function() {

		let highScores, userName, putHasRun = false;
		console.log('put', putHasRun);

		fetch('/highScore/Cooperative')
		.then(res => res.json())
		.then(scoreList => {
			highScores = scoreList;
			this.game.debug.text(`Perfect landing! Your time is ${successGlobalTime} seconds!`, gameWidth/2.3 - 96, gameHeight/5.3);
			// let playAgain = this.game.debug.text('click to play again', gameWidth/2 - 85, gameHeight/4);
			let playAgain = this.game.add.text(gameWidth/2 - 50, gameHeight/4, 'Click to play again', textStyle(height/40, 'white'));
			playAgain.inputEnabled = true;
			playAgain.events.onInputDown.add(restartGame, this);

			// input form
			this.game.add.plugin(Fabrique.Plugins.InputField);
				input = this.game.add.inputField(gameWidth/2.2 - 14, gameHeight/3.2, {
				font: '18px Arial',
				fill: '#212121',
				fontWeight: 'bold',
				width: 150,
				padding: 8,
				borderWidth: 1,
				borderColor: '#000',
				borderRadius: 6,
				// blockInput: false
			});

			let yVal = gameHeight/2.2;
			for (var i = 0; i < highScores.length; i++) {
				// if (highScores[i].time.toString().length < 5)
				this.game.debug.text(`${highScores[i].time}  -  ${highScores[i].name}`, gameWidth/2 - 85, yVal)
				yVal += 30
			}
		})
		.catch(err => console.error('error retrieving scores', err))

		this.physics.startSystem(Phaser.Physics.P2JS);

		this.background = this.game.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');

		//new dynamic text
		// this.game.debug.text(`Perfect landing! Your time is ${successGlobalTime} seconds!`, gameWidth/2.3 - 96, this.game.height/3.2);


		// creating static terrain
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

		// this.game.debug.text('click to play again', gameWidth/2 - 85, gameHeight/2.5);

		let restartGame = function() {
			this.game.state.start('MainMenu');
		}

	},

	update: function() {

		// console.log('put in up', putHasRun)
		terrain.body.rotation -= 0.003;
		if (cursors.enter.isDown) {
				userName = input.value;
				console.log('username is', typeof userName)
				fetch(`/newHighScore/Cooperative/${successGlobalTime}`, {
					method: 'POST',
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify({
						name: userName
					})
				})
				.then(() => console.log('post request successful'))
				.catch(err => console.error('error posting', err))
				// putHasRun = true;
		}

		// if(this.game.input.activePointer.justPressed()) {
		// 	this.game.state.start('MainMenu');
		// }
	}
};

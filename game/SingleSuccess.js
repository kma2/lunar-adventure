LunarAdventure.SingleSuccess = function(){};

let text = null;

LunarAdventure.SingleSuccess.prototype = {
	create: function() {

		let highScores;

		fetch('/highScore/SinglePlayer')
		.then(res => res.json())
		.then(scoreList => {
			highScores = scoreList;
			message = this.add.sprite(gameWidth/2 - 220, gameHeight/8, 'success');
			message.scale.setTo(0.6, 0.6);

			if (highScores.length < 8 || highScores[highScores.length-1].time > successGlobalTime) {
				this.game.debug.text(`Your time of ${successGlobalTime}s made it to the high score leaderboard`, gameWidth/3.5, gameHeight/4 + 15);

				// input form
				this.game.add.plugin(Fabrique.Plugins.InputField);
				input = this.game.add.inputField(gameWidth/2.6 - 14, gameHeight/3.2, {
					font: '18px Arial',
					fill: '#212121',
					fontWeight: 'normal',
					width: 150,
					padding: 8,
					borderWidth: 1,
					borderColor: '#000',
					borderRadius: 6,
					placeHolder: 'Enter your name',
					max: '15'
				});

				let submitBtn = this.game.add.sprite(gameWidth/1.9 + 20, gameHeight/3.2, 'submitBtn');
				submitBtn.inputEnabled = true;
				submitBtn.events.onInputDown.add(listener, this);
			}
			else {
				this.game.debug.text(`Your time was ${successGlobalTime}s. Try to land faster next time!`, gameWidth/3, gameHeight/4 + 15);

				//leaderBoard
				let yVal = gameHeight/2.5;
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(`${highScores[i].time}s  -  ${highScores[i].name}`, gameWidth/2 - 85, yVal)
					yVal += 30
				}
			}

			this.game.debug.text('Press spacebar to play again', gameWidth/2.3 - 40, gameHeight - 150);
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

		let listener = function() {
			console.log('in listener')
			submitBtnClicked = true;
		}

	},

	retrieveHighScores: function() {
		if (achievedHighScore) {
			console.log('achieved high score')
			fetch('/highScore/SinglePlayer')
			.then(res => res.json())
			.then(scoreList => {
				highScores = scoreList;
				this.game.debug.text(`You're on the leaderboard!`, gameWidth/2.5, gameHeight/4 + 15);
				//leaderBoard
				let yVal = gameHeight/2.3;
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(`${highScores[i].time}s  -  ${highScores[i].name}`, gameWidth/2 - 85, yVal)
					yVal += 30
				}
				this.game.debug.text('Press spacebar to play again', gameWidth/2.3 - 45, gameHeight - 150);
			})
			.catch(err => console.error(err))
		}
	},

	update: function() {
		terrain.body.rotation -= 0.003;

		if (putHasRun !== true && input !== null) {
			userName = input.value;
			if (userName.length > 0 && submitBtnClicked) {
				putHasRun = true;
				fetch(`/newHighScore/SinglePlayer/${successGlobalTime}`, {
					method: 'POST',
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify({
						name: userName
					})
				})
				.then(() => {
					console.log('post request successful')
					achievedHighScore = true;
					this.retrieveHighScores()
				})
				.catch(err => console.error('error posting', err))
			}
		}
		//press spacebar to play again
		if (tempCursors.spacebar.isDown) {
			this.game.state.start('MainMenu')
		}
	}
};

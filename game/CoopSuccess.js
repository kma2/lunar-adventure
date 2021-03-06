LunarAdventure.CoopSuccess = function(){};

text = null;

LunarAdventure.CoopSuccess.prototype = {
	create: function() {
		// array of high scores
		let highScores;

		// fetch high scores (cooperative mode) from database
		fetch('/highScore/Cooperative')
		.then(res => res.json())
		.then(scoreList => {
			highScores = scoreList;

			// success message
			message = this.add.sprite(gameWidth/2 - 220, gameHeight/8, 'success');
			message.scale.setTo(0.6, 0.6);

			// player achieves a new high score
			if (highScores.length < 8 || highScores[highScores.length-1].time > endGameTime) {
				madeLeaderboardMessage = this.game.add.text(gameWidth/3.2 - 10, gameHeight/4 - 10, `Your time of ${endGameTime}s made it to the high score leaderboard`, fontStyle);

				// input form
				this.game.add.plugin(Fabrique.Plugins.InputField);
				formInput = this.game.add.inputField(gameWidth/2.6 - 14, gameHeight/3.2, {
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

				// submit button
				submitBtn = this.game.add.sprite(gameWidth/1.9 + 20, gameHeight/3.2, 'submitBtn');
				submitBtn.inputEnabled = true;
				submitBtn.events.onInputDown.add(submitButtonListener, this);

			// player doesn't achieve a high score
			} else {
				this.game.add.text(gameWidth/3, gameHeight/3 - 75, `Your time was ${endGameTime}s. Try to land faster next time!`, fontStyle);

				// leaderboard positioning
				let yVal = gameHeight/3 + 70;

				// rank
				this.game.debug.text('RANK', gameWidth/2.6, gameHeight/3 + 30);
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(i + 1, gameWidth/2.6, yVal);
					yVal += 30;
				}

				// time
				yVal = gameHeight/3 + 70;
				this.game.debug.text('TIME', gameWidth/2.2, gameHeight/3 + 30);
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(`${highScores[i].time}s`, gameWidth/2.2, yVal);
					yVal += 30;
				}

				// name
				yVal = gameHeight/3 + 70;
				this.game.debug.text('NAME', gameWidth/1.85, gameHeight/3 + 30);
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(`${highScores[i].name}`, gameWidth/1.85, yVal);
					yVal += 30;
				}
			}
			this.game.add.text(gameWidth/2.3 - 40, gameHeight - 150, 'Press spacebar to play again', fontStyle);
		})
		.catch(err => console.error('error retrieving scores', err));

		// detect if submit button has been clicked
		let submitButtonListener = function() {
			submitBtnClicked = true;
		}

		// add physics and background image
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.background = this.game.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');

		// create terrain
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5);
		this.physics.p2.enable(terrain, false);
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');
	},

	retrieveNewHighScores: function() {
		if (achievedHighScore) {
			fetch('/highScore/Cooperative')
			.then(res => res.json())
			.then(scoreList => {
				highScores = scoreList;

				// remove madeLeaderboardMessage, input form, and submit button
				madeLeaderboardMessage.destroy();
				formInput.destroy();
				submitBtn.destroy();

				// display leaderboard that includes the winning user's name and time
				this.game.add.text(gameWidth/2.5, gameHeight/3 - 75, `You're on the leaderboard!`, fontStyle);

				// leaderboard positioning
				let yVal = gameHeight/3 + 70;

				// rank
				this.game.debug.text('RANK', gameWidth/2.6, gameHeight/3 + 30);
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(i + 1, gameWidth/2.6, yVal);
					yVal += 30;
				}

				// time
				yVal = gameHeight/3 + 70;
				this.game.debug.text('TIME', gameWidth/2.2, gameHeight/3 + 30);
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(`${highScores[i].time}s`, gameWidth/2.2, yVal);
					yVal += 30;
				}

				// name
				yVal = gameHeight/3 + 70;
				this.game.debug.text('NAME', gameWidth/1.85, gameHeight/3 + 30);
				for (var i = 0; i < highScores.length; i++) {
					this.game.debug.text(`${highScores[i].name}`, gameWidth/1.85, yVal);
					yVal += 30;
				}
			})
			.catch(err => console.error(err));
		}
	},

	update: function() {
		terrain.body.rotation -= 0.003;

		if (putHasRun !== true && formInput !== null) {
		  userName = formInput.value;

			// add the user's userName and time to db
			// then display the updated leaderboard
			if (userName.length > 0 && submitBtnClicked) {
				putHasRun = true;
				fetch(`/newHighScore/Cooperative/${endGameTime}`, {
					method: 'POST',
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						"authorization": authorizationHeader
					},
					body: JSON.stringify({
						name: userName
					})
				})
				.then(() => {
					achievedHighScore = true;
					this.retrieveNewHighScores();
				})
				.catch(err => console.error('error posting', err))
			}
		}

		// press spacebar to play again
		if (cursors.spacebar.isDown) {
			this.game.state.start('MainMenu')
		}
	}
};

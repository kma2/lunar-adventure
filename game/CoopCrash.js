LunarAdventure.CoopCrash = function(){};

LunarAdventure.CoopCrash.prototype = {
	create: function() {
		// array of high scores
		let highScores;

		// fetch high scores (cooperative mode) from database
		fetch('/highScore/Cooperative')
		.then(res => res.json())
		.then(scoreList => {
			highScores = scoreList;

			// crash message
			message = this.add.sprite(gameWidth/2 - 210, gameHeight/8, 'crash');
			message.scale.setTo(0.6, 0.6);

			this.game.add.text(gameWidth/3 - 30, gameHeight/3 - 75, `Better luck next time! Your journey was ${endGameTime} seconds.`, fontStyle);

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

			this.game.add.text(gameWidth/2.3 - 45, gameHeight - 150, "Press spacebar to play again", fontStyle);
		})
		.catch(err => console.error('error retrieving scores', err));

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

	update: function() {
		terrain.body.rotation -= 0.003;

		// press spacebar to play again
		if (cursors.spacebar.isDown) {
			this.game.state.start('MainMenu');
		}
	}
};

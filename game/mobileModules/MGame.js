var LunarAdventure = LunarAdventure || {};

LunarAdventure.MGame = function(){};

// let timeElapsedBeforeLanding = 10, globalTime = 0, frames = [ 1, 0, 5], penalty = 0;

LunarAdventure.MGame.prototype = {

	create: function() {

		let controlFontStyle = { font: "40px Asap", fill: "#fff"};

		this.physics.p2.gravity.y = 120;
		this.physics.p2.setImpactEvents(true);
		gameWidth = this.world.width;
		gameHeight = this.world.height;
		divide = 15;
		cursors = this.input.keyboard.createCursorKeys();
		tilesprite = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');
    this.invulnerable = true;
    this.toggle = true;
    this.lifeCounter = 3;
		tempCursors = {spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)}


		// initial angle for landing pad position
		centerX = gameWidth * 0.5
		centerY = gameHeight + 500

		// initial angle for landing pad position
		this.landingPadAngle = 1.5;


		// ======== make collision groups ========
		terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		shipCollisionGroup = this.physics.p2.createCollisionGroup();
		landingPadCollisionGroup = this.physics.p2.createCollisionGroup();
		obstaclesCollisionGroup = this.physics.p2.createCollisionGroup();
		boundsCollisionGroup = this.physics.p2.createCollisionGroup();


		// ======== create ship ========
		ship = this.add.sprite(gameWidth/2, gameHeight/5, 'ship');
		ship.scale.setTo(1.4, 1.4);
		this.physics.p2.enable(ship, false);

		// create bounds on sides of screen
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);

		// ======== generate obstacles! ========

		// create groups for each of the obstacle categories
		smallObstacles = this.add.group();
		smallObstacles.enableBody = true;
		smallObstacles.physicsBodyType = Phaser.Physics.P2JS;

		mediumObstacles = this.add.group();
		mediumObstacles.enableBody = true;
		mediumObstacles.physicsBodyType = Phaser.Physics.P2JS;

		largeObstacles = this.add.group();
		largeObstacles.enableBody = true;
		largeObstacles.physicsBodyType = Phaser.Physics.P2JS;

		// enable physics on all obstacle groups
		this.physics.p2.enable(smallObstacles);
		this.physics.p2.enable(mediumObstacles);
		this.physics.p2.enable(largeObstacles);

		// create bounds on sides of screen
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);


		// ======== create terrain ========
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');


		// ======== create landing pad  ========
		landingPad = this.add.sprite(centerX, 2000, 'landingPad');
		landingPad.scale.setTo(0.8, 0.8);
		this.physics.p2.enable(landingPad, false);
		landingPad.body.static = true;


		// ======== create virtual boundary  ========
		boundaryL = this.add.sprite(120, 0, 'boundary');
		boundaryL.scale.setTo(width * 0.00002778, height * 0.001929);
		this.physics.p2.enable(boundaryL);
		boundaryL.body.static = true;


		boundaryR = this.add.sprite(1160, 0, 'boundary');
		boundaryR.scale.setTo(width * 0.00002778, height * 0.001929);
		this.physics.p2.enable(boundaryR);
		boundaryR.body.static = true;

		// ======== create pad ========

		// control text
		lThrustUI = this.add.sprite(46, gameHeight - 125, 'thrust');
		lThrustUI.scale.setTo(0.5, 0.5);
		controllerL = this.add.sprite(15, gameHeight - 215, 'Mcontroller');
		controllerL.scale.setTo(0.9, 0.9);
		// controlerL.inputEnabled = true;
		// controlerL.events.onInputDown.add(this.left, this);

		// ======== create pad ========
		// control text
		rThrustUI = this.add.sprite(gameWidth - 184, gameHeight - 125, 'thrust');
		rThrustUI.scale.setTo(0.5, 0.5);
		controllerR = this.add.sprite(gameWidth - 215, gameHeight - 215, 'Mcontroller');
		controllerR.scale.setTo(0.9, 0.9);
		// controlerR.inputEnabled = true;
		// controlerR.events.onInputDown.add(this.right, this);

		// ======== set collision groups ========
		terrain.body.setCollisionGroup(terrainCollisionGroup);
		ship.body.setCollisionGroup(shipCollisionGroup);
		landingPad.body.setCollisionGroup(landingPadCollisionGroup);
		boundaryL.body.setCollisionGroup(boundsCollisionGroup);
		boundaryR.body.setCollisionGroup(boundsCollisionGroup);

		// ship and terrain collision
		terrain.body.collides([terrainCollisionGroup, shipCollisionGroup]);
		ship.body.collides(terrainCollisionGroup, this.hitTerrain, this);

		// ship and landing pad collision
		landingPad.body.collides([landingPadCollisionGroup, shipCollisionGroup]);
		ship.body.collides(landingPadCollisionGroup, this.landedShip, this);

		// ship and obstacle collision
		ship.body.collides(obstaclesCollisionGroup, this.hitObstacle, this);

		// ship and boundary collistion
		boundaryL.body.collides(shipCollisionGroup);
		boundaryR.body.collides(shipCollisionGroup);
		ship.body.collides(boundsCollisionGroup, null, this);

		// setting terrain bounce
		var shipMaterial = this.game.physics.p2.createMaterial('shipMaterial', ship.body);
		var terrainMaterial = this.game.physics.p2.createMaterial('terrainMaterial', terrain.body);
		var terrainContactMaterial = this.game.physics.p2.createContactMaterial(shipMaterial, terrainMaterial);
		terrainContactMaterial.friction = 0.3;
		terrainContactMaterial.restitution = 1.3;
		terrainContactMaterial.stiffness = 1e7;
		terrainContactMaterial.relaxation = 3;
		terrainContactMaterial.frictionStiffness = 1e7;
		terrainContactMaterial.frictionRelaxation = 3;
		terrainContactMaterial.surfaceVelocity = 0;

		//timer
		me = this;
		me.startTime = new Date()
		me.timeElapsed = 0;
		me.createTimer();

		me.gameTimer = this.game.time.events.loop(100, function() {
			me.updateTimer();
		});

		timerText = this.game.add.text(centerX - 60, 32, ('Time :  ' + globalTime + 's'), fontStyle)
		timeElapsedBeforeLanding = 0, globalTime = 0, penalty = 0;

		//particle effects for time penalties
		//putting this in another location and grabbing ships position slows game down too much

		//emitter for 5 sec penalty
		fivePenaltyEmitter = this.game.add.emitter(220,32,5000);
		fivePenaltyEmitter.makeParticles('penalty5');
		fivePenaltyEmitter.minParticleScale = 0.1;
		fivePenaltyEmitter.maxParticleScale = 0.1;
		fivePenaltyEmitter.gravity = 50;

		// this.world.bringToTop(controllerL);
		// this.world.bringToTop(controllerR);

		// generate waves of obstacles
		this.sendObstacleWaves();
		this.game.input.addPointer();
		this.game.input.addPointer();
	},

	createTimer: function() {
		let me = this;
		me.timeLabel = {};
	},

	updateTimer: function() {
		let me = this;
		let currentTime = new Date();
		let timeDifference = me.startTime.getTime() - currentTime.getTime();

		//Time elapsed in seconds
		timeElapsedNoRound = Math.abs(timeDifference * 0.001);

		timeElapsedNoRound += penalty;
		timeString = timeElapsedNoRound.toString();

		// returns floating pt number
		floatNum = parseFloat(Math.round(timeString * 100) * 0.01).toFixed(2);
		result = floatNum;

		// display two decimal points
		if (result.length === 5) {
			result = result.slice(0, 5);
		} else if (result.length === 6) {
			result = result.slice(0, 6);
		} else if (result.length === 7) {
			result = result.slice(0, 7);
		} else if (result.length === 8) {
			result = result.slice(0, 8);
		}

		me.timeLabel.text = result;

		//make time text globally accessible
		globalTime = me.timeLabel.text;
	},

	// landing pad rotation functions
	rotateLandingPadRight: function(radius, startX, startY){
		var x = startX + Math.cos(this.landingPadAngle) * radius;
		var y = startY + Math.sin(this.landingPadAngle) * radius;
		landingPad.body.x = x;
		landingPad.body.y = y;
		if(this.landingPadAngle <= 360){
			this.landingPadAngle += 0.003;
		} else {
				this.landingPadAngle = 0;
		}
	},

	rotateLandingPadLeft: function(radius, startX, startY){
		var x = startX + Math.cos(this.landingPadAngle) * radius;
		var y = startY + Math.sin(this.landingPadAngle) * radius;
		landingPad.body.x = x;
		landingPad.body.y = y;
		if(this.landingPadAngle <= 360){
			this.landingPadAngle -= 0.003;
		} else {
			this.landingPadAngle = 0;
		}
	},

	hitTerrain: function(body1, body2) {
		endGameTime = globalTime;
		let posX = ship.x;
		let posY = ship.y;
		ship.destroy();
		explosion = this.add.sprite(posX - 30, posY, 'explosion')
		explosion.scale.setTo(0.05, 0.05);
		this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOverCrash, this);
	},

	hitObstacle: function(body1, body2) {
    penalty += 5;
    fivePenaltyEmitter.start(true, 1000, null, 1)
	},

	landedShip: function(body1, body2) {
		if (ship.body) {
			endGameTime = globalTime;
			// if ship lands carefully, the landing is successful
			if (ship.angle < 20 && ship.angle > -20 && Math.abs(ship.body.velocity.x) < 20 && Math.abs(ship.body.velocity.y) < 20) {
				endGameTime = globalTime
				console.log('ship landing successful');
				ship.body = null; // disables the ship from moving
				this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOverSuccess, this);
			// else, ship crashes :(
			} else {
				console.log('ship landing unsuccessful');
				let posX = ship.x;
				let posY = ship.y;
				ship.destroy();
				console.log(ship.body)
				explosion = this.add.sprite(posX - 30, posY, 'explosion')
				explosion.scale.setTo(0.05, 0.05);
				this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOverCrash, this);
			}
		}
	},

	generateSmallObstacles: function(amount, startX, startY, velocityX, velocityY) {
		for (var i = 0; i < amount; i++) {
			var obstacle = smallObstacles.create(startX, startY, 'smallObstacle', this.rnd.pick(frames));
			obstacle.body.setCircle(25);
			obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
			obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);

			this.game.physics.p2.enable(obstacle, false);
			obstacle.body.static = true;
			obstacle.body.velocity.y = velocityY;
			obstacle.body.velocity.x = velocityX;
		}
	},

	generateTinyObstacles: function(amount, startX, startY, velocityX, velocityY) {
		for (var i = 0; i < amount; i++) {
			var obstacle = smallObstacles.create(startX, startY, 'tinyObstacle', this.rnd.pick(frames));
			obstacle.body.setCircle(8);
			obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
			obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);

			this.game.physics.p2.enable(obstacle, false);
			obstacle.body.static = true;
			obstacle.body.velocity.y = velocityY;
			obstacle.body.velocity.x = velocityX;
		}
	},

	generateMediumObstacles: function(amount, startX, startY, velocityX, velocityY) {
		for (var i = 0; i < amount; i++) {
				var obstacle = mediumObstacles.create(startX, startY, 'mediumObstacle', this.rnd.pick(frames));
				obstacle.body.setCircle(52);
				obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
				obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);

				this.game.physics.p2.enable(obstacle, false);
				obstacle.body.static = true;
				obstacle.body.velocity.y = velocityY;
				obstacle.body.velocity.x = velocityX;
		}
	},

	generateLargeObstacles: function(amount, startX, startY, velocityX, velocityY) {
		for (var i = 0; i < amount; i++) {
			var obstacle = largeObstacles.create(startX, startY, 'largeObstacle', this.rnd.pick(frames));

			obstacle.body.setCircle(180);
			obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
			obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);

			this.game.physics.p2.enable(obstacle, false);
			obstacle.body.static = true;
			obstacle.body.velocity.y = velocityY;
			obstacle.body.velocity.x = velocityX;
		}
	},

	sendObstacleWaves: function() {
		waveOne = this.game.time.events.loop(3000, () => {
			if (obstacleOriginDirection > 0.5) {
				this.generateTinyObstacles(1, -20 + Math.random() * -100, 450 + Math.random() * 200, 60 + Math.random() * 60, -15 + Math.random() * -10);
			} else {
				this.generateTinyObstacles(1, this.world.width + Math.random() * 100, 450 + Math.random() * 200, -60 + Math.random() * -60, -15 + Math.random() * -10);
			}
		});

		waveTwo = this.game.time.events.loop(4000, () => {
			if (obstacleOriginDirection < 0.5) {
				this.generateSmallObstacles(1, -80 + Math.random() * -100, 500 + Math.random() * 200,  50 + Math.random() * 40, -15 + Math.random() * -10);
			} else {
				this.generateSmallObstacles(1, this.world.width + Math.random() * 100, 500 + Math.random() * 200, -50 + Math.random() * -40, -15 + Math.random() * -10);
			}
		});

		waveThree = this.game.time.events.loop(7000, () => {
			if (obstacleOriginDirection > 0.5) {
				this.generateMediumObstacles(1, -100 + Math.random() * -100, 450 + Math.random() * 200, 40 + Math.random() * 30, -20 + Math.random() * -10);
			} else {
				this.generateMediumObstacles(1, this.world.width + Math.random() * 100, 450 + Math.random() * 200, -40 + Math.random() * -30, -20 + Math.random() * -10);
			}
		});

		waveFour = this.game.time.events.loop(10000, () => {
			if (obstacleOriginDirection > 0.5) {
				this.generateLargeObstacles(1, -200 + Math.random() * -100, 250 + Math.random() * 100, 40 + Math.random() * 20, -15 + Math.random() * -10);
			} else {
				this.generateLargeObstacles(1, 200 + this.world.width + Math.random() * 100, 250 + Math.random() * 100, -40 + Math.random() * -20, -15 + Math.random() * -10);
			}
		});
	},

	gameOverCrash: function() {
			this.game.state.start('SingleCrash', true, false);
	},

	gameOverSuccess: function() {
		this.game.state.start('SingleSuccess', true, false);
	},

	update: function() {
		// randomly decide direction where obstacles come from
		obstacleOriginDirection = Math.random();


		if (ship.body) {
			// update the timer
			timerText.destroy()
			timerText = this.game.add.text(centerX - 60, 32, ('Time :  ' + globalTime + 's'), fontStyle)

			// // for debug
			// if (cursors.left.isDown) {
			// 	ship.body.rotateLeft(100);
			// } else if (cursors.right.isDown){
			// 	ship.body.rotateRight(100);
			// } else {
			// 	ship.body.setZeroRotation();
			// }
			// // up key, accelerate
			// if (cursors.up.isDown){
			// 	ship.body.thrust(200);
			// }

			let p1 = this.game.input.pointer1;
			let p2 = this.game.input.pointer2;
			if (p1.active) {
				if (p1.x < 160 && p1.y > gameHeight - 160) {
					ship.body.thrust(400)
				} else if (p1.x > gameWidth- 160 && p1.y > gameHeight - 160 ) {
					ship.body.thrust(400);
				}
			}

			gyro.startTracking(function(o) {
				if (ship.body) { ship.body.angle = o.beta * 2 }
			});

			let radius = 820;


			// ======== terrain rotation ========

			// if landing pad is visible, use screen edge:
			if (landingPad.body.y <= gameHeight && landingPad.body.x <= 1094 && landingPad.body.x >= 130) {
				boundaryL.destroy();
				boundaryR.destroy();

				// LEFT side of screen
				if (ship.body.x <= 27.5) {
					terrain.body.rotation += 0.003;
					this.rotateLandingPadRight(radius, centerX, centerY);
					this.rotateLandingArrow();

					// add angular velocity so terrain continues to rotate slightly for smoother feel
					terrain.body.angularVelocity += 0.002;
				}

				// remove velocity once away from bound
				if (ship.body.x <= 45 || ship.body.x >= 27.5) {
					terrain.body.angularVelocity = 0;
				}

				// RIGHT side of screen
				if (ship.body.x >= 1252) {
					this.rotateLandingPadLeft(radius, centerX, centerY);
					terrain.body.rotation -= 0.003;

				// add angular velocity so terrain continues to rotate slightly for smoother feel
					terrain.body.angularVelocity += 0.002;
				}
				// remove velocity once away from bound
				if (ship.body.x <= 1252 || ship.body.x >= 1236) {
					terrain.body.angularVelocity = 0;
				}

			// if landing pad is NOT visible, use larger area:
			} else {
				// LEFT SIDE OF SCREEN
				// rotate planet if ship is close to arrows
				// 170 is world bound
				if (ship.body.x <= 260) {
					terrain.body.rotation += 0.003;
					this.rotateLandingPadRight(radius, centerX, centerY);

					// add angular velocity so terrain continues to rotate slightly for smoother feel
					terrain.body.angularVelocity += 0.002;
				}

				// remove velocity once away from bound
				if (ship.body.x <= 300 || ship.body.x >= 280) {
					terrain.body.angularVelocity = 0;
				}

				// RIGHT SIDE OF SCREEN
				if (ship.body.x >= 1029) {
					terrain.body.rotation -= 0.003;
					this.rotateLandingPadLeft(radius, centerX, centerY);

					//add angular velocity so terrain continues to rotate slightly for smoother feel
					terrain.body.angularVelocity += 0.002;
				}

					// remove velocity once away from bound
				if (ship.body.x <= 999 || ship.body.x >= 989) {
					terrain.body.angularVelocity = 0;
				}
			}

    }
	},
	right: function() {
		ship.body.rotateLeft(100);
	},
	left: function() {
		ship.body.rotateRight(100);
	}
};

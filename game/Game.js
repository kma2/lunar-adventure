var LunarAdventure = LunarAdventure || {};

LunarAdventure.Game = function(){
};

var timeElaspedBeforeLanding = 10;

LunarAdventure.Game.prototype = {
	create: function() {
		this.physics.p2.gravity.y = 20;
		this.physics.p2.setImpactEvents(true);
		gameWidth = this.world.width;
		gameHeight = this.world.height;
		divide = 15;
		cursors = this.input.keyboard.createCursorKeys();
		tilesprite = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');

		// initial angle for landing pad position
		this.angle = 1.5;


		// set boundaries on left and right of the screen
		var bounds = new Phaser.Rectangle(gameWidth/divide, 0, gameWidth/divide * (divide-2), gameHeight);
		customBounds = { left: null, right: null, top: null, bottom: null };

		centerX = window.innerWidth/2
		centerY = this.game.height/0.65 + 200
		// creating static terrain
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');


		// creating ship
		ship = this.add.sprite(gameWidth/2, gameHeight/5, 'ship');
		ship.scale.setTo(0.06, 0.06);
		this.physics.p2.enable(ship, false);


		// create sprite landing pad
		landingPad = this.add.sprite(centerX, 2000, 'landingPad');
		landingPad.scale.setTo(0.2, 0.2);
		// landingPad.anchor.setTo(1, 0)
		// landingPad.pivot.setTo(500, 0);
		this.physics.p2.enable(landingPad, false);
		landingPad.body.static = true;
		console.log(landingPad);


		////create bounds on sides of screen
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);
		// ship.body.collides(boundsCollisionGroup, hitBounds, this);


		// add event to fade in landingPad
		// this.time.events.add(Phaser.Timer.SECOND * timeElaspedBeforeLanding, this.showLandingPad, this);
		// landingPad.alpha = 0;


		// ======== set collisions ========

		var terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		var shipCollisionGroup = this.physics.p2.createCollisionGroup();
		var landingPadCollisionGroup = this.physics.p2.createCollisionGroup();
		var obstaclesCollisionGroup = this.physics.p2.createCollisionGroup();
		var boundsCollisionGroup = this.physics.p2.createCollisionGroup();

		terrain.body.setCollisionGroup(terrainCollisionGroup);
		ship.body.setCollisionGroup(shipCollisionGroup);
		landingPad.body.setCollisionGroup(landingPadCollisionGroup);

		// ship and terrain collision
		terrain.body.collides([terrainCollisionGroup, shipCollisionGroup]);
		ship.body.collides(terrainCollisionGroup, this.hitTerrain, this);

		// ship and landing pad collision
		landingPad.body.collides([landingPadCollisionGroup, shipCollisionGroup]);
		ship.body.collides(landingPadCollisionGroup, this.landedShip, this);


		// ship and obstacle collision
		ship.body.collides(obstaclesCollisionGroup, this.hitTerrain, this);


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

		var frames = [ 1, 0, 5];

		// create small obstacles
		for (var i = 0; i < 10; i++) {
				var obstacle = smallObstacles.create(this.world.width + Math.random() * 10, 200 + Math.random() * 10, 'smallObstacle', this.rnd.pick(frames));
				obstacle.body.setCircle(25);
				obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
				obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);
				obstacle.body.gravity = -60;
		}

		// create medium obstacles
		for (var i = 0; i < 5; i++) {
				var obstacle = mediumObstacles.create(this.world.width + Math.random() * 100, 200 + Math.random() * 10, 'mediumObstacle', this.rnd.pick(frames));
				obstacle.body.setCircle(52);
				obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
				obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);
				obstacle.body.gravity = -60;
		}

		// create large obstacles
		for (var i = 0; i < 1; i++) {
				var obstacle = largeObstacles.create(this.world.width + Math.random() * 1000, 200 + Math.random() * 10, 'largeObstacle', this.rnd.pick(frames));
				obstacle.body.setCircle(180);
				obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
				obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);
				obstacle.body.gravity = -60;
		}

		// enable physics on all obstacle groups
		this.physics.p2.enable(smallObstacles);
		this.physics.p2.enable(mediumObstacles);
		this.physics.p2.enable(largeObstacles);
	},

	// fade in landingPad
	// showLandingPad: function() {
	//   this.game.add.tween(landingPad).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
	// },

// landing pad rotation functions
	rotateLandingPadRight: function(radius, startX, startY){
		var x = startX + Math.cos(this.angle) * radius;
		var y = startY + Math.sin(this.angle) * radius
		landingPad.body.x = x;
		landingPad.body.y = y;
		if(this.angle <= 360){
			this.angle += 0.002;
		}else {
			this.angle = 0;
		}
	},
	rotateLandingPadLeft: function(radius, startX, startY){
		console.log(this)
		var x = startX + Math.cos(this.angle) * radius;
		var y = startY + Math.sin(this.angle) * radius
		landingPad.body.x = x;
		landingPad.body.y = y;
		if(this.angle <= 360){
			this.angle -= 0.002;
		}else {
			this.angle = 0;
		}
	},

	hitTerrain: function(body1, body2) {
			console.log('hit terrain');

			//create explosion sprite for collision
			if (body1) {
				//get the coordinates of the ship before it's destroyed so we can place the explosion at the same position
				let posX = ship.x;
				let posY = ship.y;
				// ship.destroy();
				// explosion = this.add.sprite(posX - 30, posY, 'explosion')
				// explosion.scale.setTo(0.05, 0.05);
				// this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOverCrash, this);
			}
	},

	landedShip: function(body1, body2) {
		var timeElapsed = this.game.time.now.toString();
		var timeElapsedInSeconds = timeElapsed.slice(0, timeElapsed.length - 3);

		// ship cannot crash into landing pad before it appears
		// bug: ship still bounces off the invisible landing pad
		if (timeElapsedInSeconds < timeElaspedBeforeLanding) {
			landingPad.body = null;
		} else {
			// if ship lands carefully, the landing is successful
			if (ship.angle < 20 && ship.angle > -20 && Math.abs(ship.body.velocity.x) < 20 && Math.abs(ship.body.velocity.y) < 20) {
				console.log('ship landing successful');
				ship.body = null; // disables the ship from moving
				this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOverSuccess, this);
			// else, ship crashes :(
			} else {
				console.log('ship landing unsuccessful');
				let posX = ship.x;
				let posY = ship.y;
				ship.destroy();
				explosion = this.add.sprite(posX - 30, posY, 'explosion')
				explosion.scale.setTo(0.05, 0.05);
				this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOverCrash, this);
			}
		}
	},

	hitBounds: function(body1, body2) {
		console.log('hit boundary');
	},

	destroyObstacle: function(obstacle) {
		obstacle.destroy();
	},

	gameOverCrash: function() {
			this.game.state.start('Crash', true, false);
	},

	gameOverSuccess: function() {
			this.game.state.start('Success', true, false);
	},

	update: function() {
		var timeElapsed = this.game.time.now.toString();
		var timeElapsedInSeconds = timeElapsed.slice(0, timeElapsed.length - 3);

		if (ship.body) {
			// debug info in top left corner
			this.game.debug.text('time elapsed: ' + timeElapsedInSeconds + "s", 32, 32);
			this.game.debug.text('velocity x: ' + Math.floor(ship.body.velocity.x), 32, 52);
			this.game.debug.text('velocity y: ' + Math.floor(ship.body.velocity.y), 32, 72);
			this.game.debug.text('angle: ' + Math.floor(ship.body.angle), 32, 92);

			// left key, rotate ship
			if (cursors.left.isDown) {
				ship.body.rotateLeft(100);
			}
			// right key, rotate ship
			else if (cursors.right.isDown){
				ship.body.rotateRight(100);
			}
			// stop rotating if key is not pressed
			else {
				ship.body.setZeroRotation();
			}
			// up key, accelerate
			if (cursors.up.isDown){
				ship.body.thrust(200);
			}
			// terrain spins when rocket nears the edges
			if (ship.world.x <= gameWidth/divide + 200 && ship.body.rotation < 0) {
				terrain.body.rotation += 0.002;
				this.rotateLandingPadRight(775, centerX, 1200);
				tilesprite.tilePosition.x += 4;
				tilesprite.tilePosition.y -= 1;
			} else if (ship.world.x >= gameWidth/divide * (divide-1) - 210 && ship.body.rotation > 0) {
				this.rotateLandingPadLeft(775, centerX, 1200);
				terrain.body.rotation -= 0.002;
				tilesprite.tilePosition.x -= 4;
				tilesprite.tilePosition.y -= 1;
			}
			// terrain spins FASTER when rocket nears the edges
			if (ship.world.x <= gameWidth/divide + 150 && ship.body.rotation < 0) {
				this.rotateLandingPadRight(775, centerX, 1200);
				terrain.body.rotation += 0.002;
			} else if (ship.world.x >= gameWidth/divide * (divide-1) - 160 && ship.body.rotation > 0) {
				this.rotateLandingPadLeft(775, centerX, 1200);
				terrain.body.rotation -= 0.002;
			}
		}
	},
};
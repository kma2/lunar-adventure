var LunarAdventure = LunarAdventure || {};

LunarAdventure.Game = function(){};

let timeElapsedBeforeLanding = 10, globalTime = 0, frames = [ 1, 0, 5], penalty = 0;

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
		this.landingPadAngle = 1.5;

		// ======== make collision groups ========
		terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		shipCollisionGroup = this.physics.p2.createCollisionGroup();
		landingPadCollisionGroup = this.physics.p2.createCollisionGroup();
		obstaclesCollisionGroup = this.physics.p2.createCollisionGroup();
		boundsCollisionGroup = this.physics.p2.createCollisionGroup();

		centerX = window.innerWidth/2
		centerY = this.game.height/0.65 + 200

		// ======== create ship ========
		ship = this.add.sprite(gameWidth/2, gameHeight/5, 'ship');
		ship.scale.setTo(0.06, 0.06);
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

		this.generateSmallObstacles();
		this.generateMediumObstacles();
		this.generateLargeObstacles();


		// ======== create terrain ========
		terrain = this.add.sprite(centerX, centerY, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');


		// ======== create landing pad  ========
		landingPad = this.add.sprite(centerX, 2000, 'landingPad');
		landingPad.scale.setTo(0.2, 0.2);
		this.physics.p2.enable(landingPad, false);
		landingPad.body.static = true;


		// ======== create virtual boundary  ========
		boundaryL = this.add.sprite(width/10, 0, 'boundary');
		boundaryL.scale.setTo(width/1800, height/700);
		this.physics.p2.enable(boundaryL);
		boundaryL.body.static = true;

		boundaryR = this.add.sprite(width/10*8.9, 0, 'boundary');
		boundaryR.scale.setTo(width/1800, height/700)
		this.physics.p2.enable(boundaryR);
		boundaryR.body.static = true;


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

		//particle effects for time penalties
		//putting this in another location and grabbing ships position slows game down too much
			
		//emitter for 5 sec penalty
		fivePenaltyEmitter = this.game.add.emitter(220,25,5000)
		fivePenaltyEmitter.makeParticles('penalty5')
		fivePenaltyEmitter.minParticleScale = 0.1
		fivePenaltyEmitter.maxParticleScale = 0.1
		fivePenaltyEmitter.gravity = 50;
		//emitter for 10 sec penalty
		tenPenaltyEmitter = this.game.add.emitter(230,25,5000)
		tenPenaltyEmitter.makeParticles('penalty10')
		tenPenaltyEmitter.minParticleScale = 0.1
		tenPenaltyEmitter.maxParticleScale = 0.1
		tenPenaltyEmitter.gravity = 50;
	},

	createTimer: function() {
		let me = this;
		//this fixes issue with timer appearing in some place other than upper left corner
		me.timeLabel = {};
		// me.timeLabel = me.game.add.text(500, 500, "", {font: "100px Arial", fill: "#fff"}); 
	},

	updateTimer: function() {
		let me = this;
		let currentTime = new Date();
		let timeDifference = me.startTime.getTime() - currentTime.getTime();
 
		//Time elapsed in seconds
		me.timeElapsed = Math.abs(timeDifference / 1000);

		result = Math.floor(me.timeElapsed) + penalty;
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
			this.landingPadAngle += 0.002;
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
			this.landingPadAngle -= 0.002;
		} else {
			this.landingPadAngle = 0;
		}
	},

	hitTerrain: function(body1, body2) {
		//add penalty for when you hit terrain
		penalty += 10;
		console.log('hit terrain! 10 seconds added!');
		//penalty emitter
		tenPenaltyEmitter.start(true, 1000, null, 1)

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

	hitObstacle: function(body1, body2) {
		//add penalty for when you hit obstacle
		penalty += 5;
		console.log('hit obstacle! 5 seconds added!');

		//penalty emitter
		fivePenaltyEmitter.start(true, 1000, null, 1)
		
		// //create explosion sprite for collision
		// if (body1) {
		// 	//get the coordinates of the ship before it's destroyed so we can place the explosion at the same position
		// 	let posX = ship.x;
		// 	let posY = ship.y;
		// 	// ship.destroy();
		// 	// explosion = this.add.sprite(posX - 30, posY, 'explosion')
		// 	// explosion.scale.setTo(0.05, 0.05);
		// 	// this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOverCrash, this);
		// }
	},

	landedShip: function(body1, body2) {
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

		//grab the current globalTime to pass to success screen
		successGlobalTime = globalTime
		this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOverSuccess, this);
	},

	generateSmallObstacles: function() {
		for (var i = 0; i < 10; i++) {
			var obstacle = smallObstacles.create(Math.random() * this.world.width, Math.random() * 700, 'smallObstacle', this.rnd.pick(frames));
			obstacle.body.setCircle(25);
			obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
			obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);

			this.game.physics.p2.enable(obstacle, false);
			obstacle.body.static = true;
			obstacle.body.velocity.y = -50 + Math.random() * -100;
			obstacle.body.velocity.x = -100 + Math.random() * -100;
		}
	},

	generateMediumObstacles: function() {
		for (var i = 0; i < 5; i++) {
			var obstacle = mediumObstacles.create(Math.random() * this.world.width, Math.random() * 500, 'mediumObstacle', this.rnd.pick(frames));
			obstacle.body.setCircle(52);
			obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
			obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);

			this.game.physics.p2.enable(obstacle, false);
			obstacle.body.static = true;
			obstacle.body.velocity.y = -50 + Math.random() * -100;
			obstacle.body.velocity.x = -50 + Math.random() * -100;
		}
	},

	generateLargeObstacles: function() {
		for (var i = 0; i < 2; i++) {
			var obstacle = largeObstacles.create(Math.random() * this.world.width, Math.random() * 300, 'largeObstacle', this.rnd.pick(frames));
			obstacle.body.setCircle(180);
			obstacle.body.setCollisionGroup(obstaclesCollisionGroup);
			obstacle.body.collides([obstaclesCollisionGroup, shipCollisionGroup]);

			this.game.physics.p2.enable(obstacle, false);
			obstacle.body.static = true;
			obstacle.body.velocity.y = -30 + Math.random() * -100;
			obstacle.body.velocity.x = -30 + Math.random() * -100;
		}
	},

	gameOverCrash: function() {
		this.game.state.start('Crash', true, false);
	},

	gameOverSuccess: function() {
		this.game.state.start('Success', true, false);
	},

	update: function() {

		if (ship.body) {
			// debug info in top left corner
			this.game.debug.text('time elapsed: ' + globalTime + "s", 32, 32);
			this.game.debug.text('velocity x: ' + Math.floor(ship.body.velocity.x), 32, 52);
			this.game.debug.text('velocity y: ' + Math.floor(ship.body.velocity.y), 32, 72);
			this.game.debug.text('angle: ' + Math.floor(ship.body.angle), 32, 92);

			// left key, rotate ship
			if (cursors.left.isDown) { ship.body.rotateLeft(100); }
			// right key, rotate ship
			else if (cursors.right.isDown){ ship.body.rotateRight(100); }
			// stop rotating if key is not pressed
			else { ship.body.setZeroRotation(); }
			// up key, accelerate
			if (cursors.up.isDown){ ship.body.thrust(200); }
			
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
			// // terrain spins FASTER when rocket nears the edges
			// if (ship.world.x <= gameWidth/divide + 150 && ship.body.rotation < 0) {
			// 	this.rotateLandingPadRight(775, centerX, 1200);
			// 	terrain.body.rotation += 0.002;
			// } else if (ship.world.x >= gameWidth/divide * (divide-1) - 160 && ship.body.rotation > 0) {
			// 	this.rotateLandingPadLeft(775, centerX, 1200);
			// 	terrain.body.rotation -= 0.002;
			// }
		}
	},
};
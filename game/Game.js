var LunarAdventure = LunarAdventure || {};

LunarAdventure.Game = function(){};

let timeElapsedBeforeLanding = 10, globalTime = 0, frames = [ 1, 0, 5], penalty = 0, rotateRight = false;

LunarAdventure.Game.prototype = {

	create: function() {

		console.log(this.game.worldRight)

		// update the game count
		fetch('/incrementGame/SinglePlayer', {
			method: 'PUT'
		})
		.catch(err => console.error('updating single did not work', err))

		// create variable for our timer text
		timerText = this.game.add.text(centerX - 60, 32, ('Time :  ' + globalTime + 's'), fontStyle)

		tempCursors = {spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)}


		// reset timer and global variables since might be coming from different play state
		timeElapsedBeforeLanding = 0, globalTime = 0, penalty = 0;

		this.physics.p2.gravity.y = 70;
		this.physics.p2.setImpactEvents(true);
		gameWidth = this.world.width;
		gameHeight = this.world.height;
		divide = 15;
		cursors = this.input.keyboard.createCursorKeys();
		tilesprite = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield');
    this.invulnerable = true;
    this.toggle = true;
    this.lifeCounter = 3;

    keyboardArray = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];

    cursorArray = ['up', 'left', 'right', 'spacebar']

		// initial angle for landing pad position
		centerX = gameWidth/2
		centerY = gameHeight + 500

    // HEALTH BAR UI
    fullHealth = this.add.sprite(gameWidth - 200, 20, 'fullHealth');
    fullHealth.scale.setTo(0.25, 0.20);
    fullHealth.alpha = 1;
    this.fullHealth = fullHealth;

    twoHealth = this.add.sprite(gameWidth - 200, 20, 'twoHealth');
    twoHealth.scale.setTo(0.25, 0.20);
    twoHealth.alpha = 1;
    this.twoHealth = twoHealth;

    oneHealth = this.add.sprite(gameWidth - 200, 20, 'oneHealth');
    oneHealth.scale.setTo(0.25, 0.20);
    oneHealth.alpha = 1;
    this.oneHealth = oneHealth;

    emptyHealth = this.add.sprite(gameWidth - 200, 20, 'emptyHealth');
    emptyHealth.scale.setTo(0.25, 0.20);

    invulnerableUI = this.add.sprite(gameWidth - 200, 90, 'invulnerable');
    invulnerableUI.scale.setTo(0.25, 0.25);
    invulnerableUI.alpha = 0;


		// define key UI images
		// leftKeyUp = this.add.sprite(centerX + 395, 110, 'leftKeyUp');
		leftKeyUp = this.add.sprite(centerX - 115, this.world.height - 120, 'leftKeyUp');
		leftKeyUp.scale.setTo(0.25, 0.25);
		leftKeyUp.visible = true;

		// rightKeyUp = this.add.sprite(centerX + 560, 110, 'rightKeyUp');
		rightKeyUp = this.add.sprite(centerX + 48, this.world.height - 120, 'rightKeyUp');
		rightKeyUp.scale.setTo(0.25, 0.25);
		rightKeyUp.visible = true;

		// upKeyUp = this.add.sprite(centerX + 480, 35, 'upKeyUp');
		upKeyUp = this.add.sprite(centerX - 35, this.world.height - 195, 'upKeyUp');
		upKeyUp.scale.setTo(0.25, 0.25);
		upKeyUp.visible = true;

		// leftKeyDown = this.add.sprite(centerX + 395, 123, 'leftKeyDown');
		leftKeyDown = this.add.sprite(centerX - 115, this.world.height - 107, 'leftKeyDown');
		leftKeyDown.scale.setTo(0.25, 0.25);
		leftKeyDown.visible = false;


		// rightKeyDown = this.add.sprite(centerX + 560, 123, 'rightKeyDown');
		rightKeyDown = this.add.sprite(centerX + 48, this.world.height - 107, 'rightKeyDown');
		rightKeyDown.scale.setTo(0.25, 0.25);
		rightKeyDown.visible = false;

		// upKeyDown = this.add.sprite(centerX + 480, 48, 'upKeyDown');
		upKeyDown = this.add.sprite(centerX - 35, this.world.height - 182, 'upKeyDown');
		upKeyDown.scale.setTo(0.25, 0.25);
		upKeyDown.visible = false;

		// thrustUI = this.add.sprite(centerX + 480, 15, 'thrust');
		thrustUI = this.add.sprite(centerX - 35, this.world.height - 215, 'thrust');
		thrustUI.scale.setTo(0.25, 0.25);

		// rotateRightUI = this.add.sprite(centerX + 560, 190, 'rotateR');
		rotateRightUI = this.add.sprite(centerX + 48, this.world.height - 40, 'rotateR');
		rotateRightUI.scale.setTo(0.25, 0.25);

		// rotateLeftUI = this.add.sprite(centerX + 360, 190, 'rotateL');
		rotateLeftUI = this.add.sprite(centerX - 152, this.world.height - 40, 'rotateL');
		rotateLeftUI.scale.setTo(0.25, 0.25);

		landingArrow = this.add.sprite(centerX, 2000, 'landingArrow');
		landingArrow.scale.setTo(0.25, 0.25);
		landingArrow.alpha = 0;

    leftIndicator = this.add.sprite(100, 400, 'landingArrow');
    leftIndicator.scale.setTo(0.20, 0.20);
    leftIndicator.alpha = 0;
    leftIndicator.anchor.set(0.5);
    leftIndicator.rotation = 1.5;

    rightIndicator = this.add.sprite(gameWidth - 100, 400, 'landingArrow');
    rightIndicator.scale.setTo(0.20, 0.20);
    rightIndicator.alpha = 0;
    rightIndicator.anchor.set(0.5);
    rightIndicator.rotation = -1.5;

    // Arrow tweens
    this.add.tween(leftIndicator).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 3, true)
    this.add.tween(rightIndicator).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 3, true)
		this.add.tween(landingArrow).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true)

		// set boundaries on left and right of the screen
		// var bounds = new Phaser.Rectangle(gameWidth/divide, 0, gameWidth/divide * (divide-2), gameHeight);
		// customBounds = { left: null, right: null, top: null, bottom: null };

		// initial angle for landing pad position
		this.landingPadAngle = 1.5;


		// ======== make collision groups ========
		terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		shipCollisionGroup = this.physics.p2.createCollisionGroup();
		landingPadCollisionGroup = this.physics.p2.createCollisionGroup();
		obstaclesCollisionGroup = this.physics.p2.createCollisionGroup();
		// leftBoundsCollisionGroup = this.physics.p2.createCollisionGroup();
		// rightBoundsCollisionroup = this.physics.p2.createCollisionGroup();

		// ======== create ship ========
		ship = this.add.sprite(gameWidth/2, gameHeight/5, 'ship');
		ship.scale.setTo(0.06, 0.06);
		this.physics.p2.enable(ship, false);

		// create bounds on sides of screen
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);

		// setBoundsToWorld: function (left, right, top, bottom, setCollisionGroup)

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
		// boundaryL = this.add.sprite(-1, 0, 'boundary');
		// boundaryL.scale.setTo(width/1000000, height);
		// this.physics.p2.enable(boundaryL, true);
		// boundaryL.body.static = true;


		// boundaryR = this.add.sprite(width, 0, 'boundary');
		// boundaryR.scale.setTo(width/1000000, height)
		// this.physics.p2.enable(boundaryR, true);
		// boundaryR.body.static = true;


		// ======== set collision groups ========
		terrain.body.setCollisionGroup(terrainCollisionGroup);
		ship.body.setCollisionGroup(shipCollisionGroup);
		landingPad.body.setCollisionGroup(landingPadCollisionGroup);
		// boundaryL.body.setCollisionGroup(leftBoundsCollisionGroup);
		// boundaryR.body.setCollisionGroup(rightBoundsCollisionGroup);

		// ship and terrain collision
		terrain.body.collides([terrainCollisionGroup, shipCollisionGroup]);
		ship.body.collides(terrainCollisionGroup, this.hitTerrain, this);

		// ship and landing pad collision
		landingPad.body.collides([landingPadCollisionGroup, shipCollisionGroup]);
		ship.body.collides(landingPadCollisionGroup, this.landedShip, this);

		// ship and obstacle collision
		ship.body.collides(obstaclesCollisionGroup, this.hitObstacle, this);


		// ship and boundary collistion
		// boundaryL.body.collides(shipCollisionGroup);
		// boundaryR.body.collides(shipCollisionGroup);
		// ship.body.collides(boundsCollisionGroup, null, this);
		// ship.body.collides(leftBoundsCollisionGroup, this.rotateTerrainRight, this);
		// ship.body.collides(rightBoundsCollisionGroup, this.rotateTerrainLeft, this);


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
		fivePenaltyEmitter = this.game.add.emitter(220,32,5000);
		fivePenaltyEmitter.makeParticles('penalty5');
		fivePenaltyEmitter.minParticleScale = 0.1;
		fivePenaltyEmitter.maxParticleScale = 0.1;
		fivePenaltyEmitter.gravity = 50;
		//emitter for 10 sec penalty
		tenPenaltyEmitter = this.game.add.emitter(230,32,5000);
		tenPenaltyEmitter.makeParticles('penalty10');
		tenPenaltyEmitter.minParticleScale = 0.1;
		tenPenaltyEmitter.maxParticleScale = 0.1;
		tenPenaltyEmitter.gravity = 50;

		this.world.bringToTop(leftKeyUp);
		this.world.bringToTop(leftKeyDown);
		this.world.bringToTop(rightKeyUp);
		this.world.bringToTop(rightKeyDown);
		this.world.bringToTop(upKeyUp);
		this.world.bringToTop(upKeyDown);
		this.world.bringToTop(thrustUI);
		this.world.bringToTop(rotateRightUI);
		this.world.bringToTop(rotateLeftUI);

		// generate waves of obstacles
		this.sendObstacleWaves();
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

		//time elapsed in seconds
		timeElapsedNoRound = Math.abs(timeDifference / 1000)

		//add penalty for hitting obstacles
		timeElapsedNoRound += penalty

		timeString = timeElapsedNoRound.toString()

		//returns floating pt number
		floatNum = parseFloat(Math.round(timeString * 100) / 100).toFixed(2)
		result = floatNum;

		//make sure we always show 2 decimal points
		if (result.length === 5) {
			result = result.slice(0,5)
		}
		else if (result.length === 6) {
			result = result.slice(0,6)
		}
		else if (result.length === 7) {
			result = result.slice(0,7)
		}
		else if (result.length === 8) {
			result = result.slice(0,8)
		}

		me.timeLabel.text = result;

		//make time text globally accessible
		globalTime = me.timeLabel.text;
	},

	rotateTerrainLeft: function() {
		let radius = 820
		this.rotateLandingPadLeft(radius, centerX, centerY);
		this.rotateLandingArrow();
		terrain.body.rotation -= 0.003;
		tilesprite.tilePosition.x -= 0.6;
		tilesprite.tilePosition.y -= 0.3;
	},

	rotateTerrainRight: function() {
		console.log('inside rotate right')
		console.log('rotate right is:', rotateRight)
		rotateRight = true;
		// let radius = 820
		// terrain.body.rotation += 0.003;
		// this.rotateLandingPadRight(radius, centerX, centerY);
		// this.rotateLandingArrow();
		// tilesprite.tilePosition.x += 0.6;
		// tilesprite.tilePosition.y -= 0.3;
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

	rotateLandingArrow: function(radius, startX, startY){
		landingArrow.x = landingPad.body.x - 32;
		landingArrow.y = landingPad.body.y - 85;
	},

  setVulnerablity: function(){
    if(this.lifeCounter === 3){
      this.fullHealth.alpha = 1;
    } else if (this.lifeCounter === 2) {
      this.fullHealth.alpha = 0;
      this.twoHealth.alpha = 1;
    } else if(this.lifeCounter === 1) {
      this.fullHealth.alpha = 0;
      this.twoHealth.alpha = 0;
      this.oneHealth.alpha = 1;
    } else {
      this.fullHealth.alpha = 1;
      this.twoHealth.alpha = 0;
      this.oneHealth.alpha = 0;
      this.lifeCounter = 3;
    }

    this.invulnerable = false;
    this.toggle = true;
    ship.tint = 0xFFFFFF;
  },

	hitTerrain: function(body1, body2) {
	    if(!this.invulnerable) {
	    	endGameTime = globalTime;
				let posX = ship.x;
				let posY = ship.y;
				ship.destroy();
				explosion = this.add.sprite(posX - 30, posY, 'explosion')
				explosion.scale.setTo(0.05, 0.05);
				this.game.time.events.add(Phaser.Timer.SECOND * .5, this.gameOverCrash, this);
				// this.gameOverCrash()
	    }
	    console.log("PHEW! You were invulnerable!")
		},

		hitObstacle: function(body1, body2) {
	    // change key
	    if(!this.invulnerable){
	      this.lifeCounter--;
	      console.log("LIFE COUNTER IS", this.lifeCounter);
	      this.fullHealth.alpha = 0;
	      this.twoHealth.alpha = 0;
	      this.oneHealth.alpha = 0;


	      if(this.lifeCounter === 0) {
	        // change key
	        // cursor to change (left, right, up)
	        var cursor = cursorArray[Math.floor(Math.random() * 3)]

	        // new key
	        var newKey = keyboardArray[Math.floor(Math.random() * 26)]

	        console.log("THIS IS THE CURSOR", cursor)
	        console.log("IS NOW....")
	        console.log("THIS IS NEW KEY", newKey)

	        var collisionToggle = true;

	        while(collisionToggle){
	          if (cursors.left.keyCode === Phaser.KeyCode[newKey]) {
	            newKey = keyboardArray[Math.floor(Math.random() * 26)]
	          } else if (cursors.right.keyCode === Phaser.KeyCode[newKey]){
	            newKey = keyboardArray[Math.floor(Math.random() * 26)]
	          } else if (cursors.up.keyCode === Phaser.KeyCode[newKey]){
	            newKey = keyboardArray[Math.floor(Math.random() * 26)]
	          } else {
	            collisionToggle = false;
	          }
	        }
	        cursors[cursor] = this.input.keyboard.addKey(Phaser.KeyCode[newKey])


	        // assign new key icons
	        if (cursor === 'left') {
	          leftKeyUp.destroy();
	          leftKeyDown.destroy();

	          leftKeyUp = this.add.sprite(centerX - 115, this.world.height - 120, `leftKeyLetter${newKey}Unpressed`);
	          leftKeyUp.scale.setTo(0.25, 0.25);
	          leftKeyUp.visible = true;

	          leftKeyDown = this.add.sprite(centerX - 115, this.world.height - 107, `leftKeyLetter${newKey}Pressed`);
	          leftKeyDown.scale.setTo(0.25, 0.25);
	          leftKeyDown.visible = false;
	        } else if ( cursor === 'right') {
	          rightKeyUp.destroy();
	          rightKeyDown.destroy();

	          rightKeyUp = this.add.sprite(centerX + 48, this.world.height - 120, `rightKeyLetter${newKey}Unpressed`);
	          rightKeyUp.scale.setTo(0.25, 0.25);
	          rightKeyUp.visible = true;

	          rightKeyDown = this.add.sprite(centerX + 48, this.world.height - 107, `rightKeyLetter${newKey}Pressed`);
	          rightKeyDown.scale.setTo(0.25, 0.25);
	          rightKeyDown.visible = false;
	        } else {
	          upKeyUp.destroy();
	          upKeyDown.destroy();

	          upKeyUp = this.add.sprite(centerX - 35, this.world.height - 195, `upKeyLetter${newKey}Unpressed`);
	          upKeyUp.scale.setTo(0.25, 0.25);
	          upKeyUp.visible = true;

	          upKeyDown = this.add.sprite(centerX - 35, this.world.height - 182, `upKeyLetter${newKey}Pressed`);
	          upKeyDown.scale.setTo(0.25, 0.25);
	          upKeyDown.visible = false;
	        }

	      //add penalty for when you hit obstacle
	        penalty += 5;
	        console.log('hit obstacle! 5 seconds added!');

	        //penalty emitter
	        fivePenaltyEmitter.start(true, 1000, null, 1)
      		}
    	}
    this.invulnerable = true;
	},

	landedShip: function(body1, body2) {
		if (ship.body) {
			endGameTime = globalTime
			// if ship lands carefully, the landing is successful
			if (ship.angle < 20 && ship.angle > -20 && Math.abs(ship.body.velocity.x) < 20 && Math.abs(ship.body.velocity.y) < 20) {
				console.log('ship landing successful');
				ship.body = null; // disables the ship from moving
				this.game.time.events.add(Phaser.Timer.SECOND, this.gameOverSuccess, this);
			// else, ship crashes :(
			} else {
				console.log('ship landing unsuccessful');
				let posX = ship.x;
				let posY = ship.y;
				ship.destroy();
				explosion = this.add.sprite(posX - 30, posY, 'explosion')
				explosion.scale.setTo(0.05, 0.05);
				this.game.time.events.add(Phaser.Timer.SECOND, this.gameOverCrash, this);
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
		waveOne = this.game.time.events.loop(8000, () => {
			this.generateTinyObstacles(1, this.world.width + Math.random() * 100, 400 + Math.random() * 300, -40 + Math.random() * -60, -20 + Math.random() * -50
			);
			this.generateTinyObstacles(1, Math.random() * -100, 400 + Math.random() * 300, 40 + Math.random() * 60, -20 + Math.random() * -50
			);
		});
		waveTwo = this.game.time.events.loop(12000, () => {
			this.generateSmallObstacles(1, this.world.width + Math.random() * 100, 100 + Math.random() * 400, -60 + Math.random() * -50, -30 + Math.random() * -30
			);
			this.generateSmallObstacles(1, Math.random() * -100, + Math.random() * 400,  Math.random() * 50, + Math.random() * -30
			);
			this.generateMediumObstacles(1, this.world.width + Math.random() * 100, 200 + Math.random() * 400, -60 + Math.random() * -100, -20 + Math.random() * -30);
			this.generateMediumObstacles(1, Math.random() * -100, + Math.random() * 400,  Math.random() * 100, + Math.random() * -30);
		});
		waveThree = this.game.time.events.loop(36000, () => {
			this.generateLargeObstacles(1, this.world.width + 250, 400 + Math.random() * 200, -80, -40 + Math.random() * -20);
			this.generateLargeObstacles(1, -1000, 800 + Math.random() * 200, 80, -40 + Math.random() * -20);
		});
	},

	gameOverCrash: function() {
		this.game.state.start('SingleCrash', true, false);
	},

	gameOverSuccess: function() {
		this.game.state.start('SingleSuccess', true, false);
	},

	update: function() {

    if(this.invulnerable){
      if(this.toggle){

        // ship flash
        let shipTween = this.game.add.tween(ship).to({tint: 0x00FFFF}, 200, "Linear", true);
        shipTween.repeat(11);

        // invulnerable UI flash
        let invulnerableTween = this.game.add.tween(invulnerableUI).from({alpha : 1}, 200, "Linear", true);
        invulnerableTween.repeat(11);

        // HEALTHBAR UI
        if(this.lifeCounter === 2){
          let fullHealthTween = this.game.add.tween(fullHealth).from({alpha : 1}, 200, "Linear", true);
          fullHealthTween.repeat(11);
        } else if(this.lifeCounter === 1) {
          let twoHealthTween = this.game.add.tween(twoHealth).from({alpha : 1}, 200, "Linear", true);
          twoHealthTween.repeat(11);
        } else if (this.lifeCounter === 0) {
          console.log("HELLO!!!")
          let oneHealthTween = this.game.add.tween(oneHealth).from({alpha : 1}, 200, "Linear", true);
          oneHealthTween.repeat(11);
        }

        this.toggle = false;
        this.time.events.add(Phaser.Timer.SECOND * 3, this.setVulnerablity, this);
      }
      invulnerableUI.alpha = 0;
    }

		if (ship.body) {

			//move time to middle of screen
			timerText.destroy()
			timerText = this.game.add.text(centerX - 60, 32, ('Time :  ' + globalTime + 's'), fontStyle)

			// left key, rotate ship

			if (cursors.left.isDown) {
				leftKeyUp.visible = false;
				leftKeyDown.visible = true;
				ship.body.rotateLeft(100);
			}
			// right key, rotate ship
			else if (cursors.right.isDown){
				rightKeyUp.visible = false;
				rightKeyDown.visible = true;
				ship.body.rotateRight(100);
			}
			// stop rotating if key is not pressed
			else {
				leftKeyUp.visible = true;
				leftKeyDown.visible = false;
				rightKeyUp.visible = true;
				rightKeyDown.visible = false;
				ship.body.setZeroRotation();
			}
			// up key, accelerate
			if (cursors.up.isDown){
				upKeyUp.visible = false;
				upKeyDown.visible = true;
				ship.body.thrust(200);
			} else {
				upKeyUp.visible = true;
				upKeyDown.visible = false;
			}


			if (ship.body.rotation < -3.15) { ship.body.rotation = 3.15; }
			if (ship.body.rotation > 3.15) { ship.body.rotation = -3.15; }

			let radius = 820;


			// HAVE TO THINK OF SOME WAY TO ROTATE SMOOTHLY OR DETECT THAT I'M STILL IN CONTACT
			// WITH VIRTUAL WORLD BOUND SPRITE - WONT ROTATE SMOOTHYLY OTHERWISE. WILL BE SMALL ROTATIONS
				// console.log('ship body', ship.body.x)
				// console.log('ship world', ship.world.x)
				// console.log('landing pad pos:', landingPad.body.y)

				// is landing pad visible?
				if (landingPad.body.y <= gameHeight) {
					//only rotate planet if hit edge of screen
					if (ship.body.x <= 27.5) {
						terrain.body.rotation += 0.003;
						this.rotateLandingPadRight(radius, centerX, centerY);
						this.rotateLandingArrow();
						tilesprite.tilePosition.x += 0.6;
						tilesprite.tilePosition.y -= 0.3;

						//add angular velocity so terrain continues to rotate slightly for smoother feel
						terrain.body.angularVelocity += 0.002;
					}
					//remove velocity once away from bound
					//was 45 but moving further out
					if (ship.body.x <= 45 || ship.body.x >= 27.5) {
						terrain.body.angularVelocity = 0;		
					}
				} else {
						//otherwise rotate planet if near arrows
						if (ship.body.x <= 120) {
							terrain.body.rotation += 0.003;
							this.rotateLandingPadRight(radius, centerX, centerY);
							this.rotateLandingArrow();
							tilesprite.tilePosition.x += 0.6;
							tilesprite.tilePosition.y -= 0.3;

							//add angular velocity so terrain continues to rotate slightly for smoother feel
							terrain.body.angularVelocity += 0.002;
						}
							//remove velocity once away from bound
						//was 45 but moving further out
						if (ship.body.x <= 140 || ship.body.x >= 100) {
							terrain.body.angularVelocity = 0;		
						}
					}

				// check if any edge part of ship is less than or equal to world bound then rotate
				// messing up slightly now because of the box collision group of rocket
				//was 27.5 for edge of screen - move further out
				// if (ship.body.x <= 120) {
				// 	terrain.body.rotation += 0.003;
				// 	this.rotateLandingPadRight(radius, centerX, centerY);
				// 	this.rotateLandingArrow();
				// 	tilesprite.tilePosition.x += 0.6;
				// 	tilesprite.tilePosition.y -= 0.3;

				// 	//add angular velocity so terrain continues to rotate slightly for smoother feel
				// 	terrain.body.angularVelocity += 0.002;
				// }
					//remove velocity once away from bound
					//was 45 but moving further out
					if (ship.body.x <= 140 || ship.body.x >= 100) {
						terrain.body.angularVelocity = 0;		
					}

			// 1253 - 1256 for right side of screen`
				if (ship.body.x >= 1252) {
					this.rotateLandingPadLeft(radius, centerX, centerY);
					this.rotateLandingArrow();
					terrain.body.rotation -= 0.003;
					tilesprite.tilePosition.x -= 0.6;
					tilesprite.tilePosition.y -= 0.3;

				// add angular velocity so terrain continues to rotate slightly for smoother feel
					terrain.body.angularVelocity += 0.002;
				}
					// remove velocity once away from bound
					if (ship.body.x <= 1252 || ship.body.x >= 1236) {
						terrain.body.angularVelocity = 0;		
					}

			// terrain spins when rocket nears the edges
			// if (ship.world.x <= gameWidth/divide + 250 && ship.body.rotation < 0) {
			// 	terrain.body.rotation += 0.003;
			// 	this.rotateLandingPadRight(radius, centerX, centerY);
			// 	this.rotateLandingArrow();
			// 	tilesprite.tilePosition.x += 0.6;
			// 	tilesprite.tilePosition.y -= 0.3;
			// } else if (ship.world.x >= gameWidth/divide * (divide-1) - 250 && ship.body.rotation > 0) {
				// this.rotateLandingPadLeft(radius, centerX, centerY);
				// this.rotateLandingArrow();
				// terrain.body.rotation -= 0.003;
				// tilesprite.tilePosition.x -= 0.6;
				// tilesprite.tilePosition.y -= 0.3;
			// }

    }
	}
};

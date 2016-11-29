var LunarAdventure = LunarAdventure || {};

LunarAdventure.Game = function(){
};

var timeElaspedBeforeLanding = 10;
var frames = [ 1, 0, 5];

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
    // this.obstaclesAngleangle = 1.5;


    // ======== set collisions ========

		terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		shipCollisionGroup = this.physics.p2.createCollisionGroup();
		landingPadCollisionGroup = this.physics.p2.createCollisionGroup();
    obstaclesCollisionGroup = this.physics.p2.createCollisionGroup();
		//boundsCollisionGroup = this.physics.p2.createCollisionGroup();


		// set boundaries on left and right of the screen
		// var bounds = new Phaser.Rectangle(gameWidth/divide, 0, gameWidth/divide * (divide-2), gameHeight);
		// customBounds = { left: null, right: null, top: null, bottom: null };

    centerX = window.innerWidth/2
    centerY = this.game.height/0.65 + 200


    // ======== create ship ========
		ship = this.add.sprite(gameWidth/2, gameHeight/5, 'ship');
		ship.scale.setTo(0.06, 0.06);
		this.physics.p2.enable(ship, false);


		////create bounds on sides of screen
		//this.physics.p2.setBoundsToWorld(true, true, true, true, true);
		// ship.body.collides(boundsCollisionGroup, hitBounds, this);


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


    // ======== set collision groups ========
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

    console.log(smallObstacles.position.x)
    console.log(smallObstacles.position.y)
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
    // if ship lands carefully, the landing is successful
    if (ship.angle < 20 && ship.angle > -20 && Math.abs(ship.body.velocity.x) < 20 && Math.abs(ship.body.velocity.y) < 20) {
      console.log('ship landing successful');
      ship.body = null; // disables the ship from moving
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOverSuccess, this);
    } else {
      console.log('ship landing unsuccessful');
      let posX = ship.x;
      let posY = ship.y;
      ship.destroy();
      explosion = this.add.sprite(posX - 30, posY, 'explosion')
      explosion.scale.setTo(0.05, 0.05);
      this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOverCrash, this);
    }
	},

	hitBounds: function(body1, body2) {
		console.log('hit boundary');
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
      //this.game.debug.text('time elapsed: ' + timeElapsedInSeconds + "s", 32, 32);
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
        //this.rotateObstaclesRight(900, 0, 0);
      } else if (ship.world.x >= gameWidth/divide * (divide-1) - 210 && ship.body.rotation > 0) {
        this.rotateLandingPadLeft(775, centerX, 1200);
        //this.rotateObstaclesLeft(900, 0, 0);
        terrain.body.rotation -= 0.002;
      }
      // terrain spins FASTER when rocket nears the edges
      if (ship.world.x <= gameWidth/divide + 150 && ship.body.rotation < 0) {
        this.rotateLandingPadRight(775, centerX, 1200);
        //this.rotateObstaclesRight(900, 0, 0);
        terrain.body.rotation += 0.002;
      } else if (ship.world.x >= gameWidth/divide * (divide-1) - 160 && ship.body.rotation > 0) {
        this.rotateLandingPadLeft(775, centerX, 1200);
        //this.rotateObstaclesLeft(900, 0, 0);
        terrain.body.rotation -= 0.002;
      }
    }
  },
};

var LunarAdventure = LunarAdventure || {};

LunarAdventure.Game = function(){};

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

		// create terrain
		// const octagon = function(radius, start_x, start_y) {
		// 	const edgeLength = radius/Math.sqrt(4+(2 * Math.sqrt(2))) * 2;
		// 	const v1_x = start_x;
		// 	const v1_y = start_y;
		// 	const v2_x = start_x + edgeLength;
		// 	const v2_y = start_y;
		// 	let finalArray = [[v1_x, v1_y], [v2_x, v2_y]];
		// 	return finalArray;
		// }
    //
		// const createPlanet = function(array, numSegs, height, roughness) {
		// 	var points = [];
		// 	var height = height || 180;
		// 	var displace = height / 10;
		// 	var roughness = roughness || 1;
		// 	var numSegs = numSegs;
		// 	let edgeLength = array[1][0] - array[0][0];
		// 	const segLength = edgeLength/numSegs;
		// 	let power = Math.pow(2, Math.ceil(Math.log(edgeLength) / (Math.log(2))));
		// 	// TOP OF OCTAGON
		// 	let x = array[0][0]
		// 	let y = array[0][1];
		// 	for(var j = 0; j < numSegs - 1; j++){
		// 		x += segLength;
		// 		y += (Math.random()*displace*2) - displace;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	// TOP RIGHT OF OCTAGON - work in progress
		// 	displace = height / 10;
		// 	for(j = 0; j < numSegs; j++){
		// 		x += (Math.random()*displace*2) + displace/2;
		// 		y += (Math.random()*displace*2) + displace/2;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	// RIGHT SIDE OF OCTAGON
		// 	displace = height / 10;
		// 	for(j = 0; j < numSegs; j++){
		// 		x += (Math.random()*displace*2) - displace;
		// 		y += segLength;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	// BOTTOM RIGHT OF OCTAGON - work in progress
		// 	displace = height / 10;
		// 	for(j = 0; j < numSegs; j++){
		// 		x -= segLength/1.6;
		// 		y += (Math.random()*displace*2) + displace/2;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	// BOTTOM OF OCTAGON
		// 	displace = height / 10;
		// 	points.push(x)
		// 	points.push(y)
		// 	for(j = 0; j < numSegs; j++){
		// 		x -= segLength;
		// 		y += (Math.random()*displace*2) - displace;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	// BOTTOM LEFT of OCTAGON - work in progress
		// 	displace = height / 10;
		// 	for(j = 0; j < numSegs; j++){
		// 		x -= (Math.random()*displace*2) + displace/2;
		// 		y -= (Math.random()*displace*2) + displace/2;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	// LEFT SIDE OF OCTAGON
		// 	displace = height / 10;
		// 	points.push(x)
		// 	points.push(y)
		// 	for(j = 0; j < numSegs; j++){
		// 		x -= (Math.random()*displace*2) - displace;
		// 		y -= segLength;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	// TOP LEFT OF OCTAGON - work in progress
		// 	displace = height / 10;
		// 	for(j = 0; j < numSegs; j++){
		// 		x += segLength/2;
		// 		y -= (Math.random()*displace*2) - displace/10;
		// 		points.push(x);
		// 		points.push(y);
		// 		displace *= roughness;
		// 	}
		// 	x = (array[0][0] + x)/2;
		// 	y = (array[0][1] + y)/2;
		// 	points.push(x);
		// 	points.push(y);
		// 	return points
		// };
		// var octagonArray = octagon(window.innerWidth/1.4, 500, 150);
		// poly = new Phaser.Polygon(createPlanet(octagonArray, 10, 250, 1.05));
		// graphics = this.add.graphics(100, 100);
		// graphics.beginFill(0xeaeaea); // light gray
		// graphics.drawPolygon(poly.points);
		// graphics.endFill();
		// terrain = this.add.sprite(window.innerWidth/2, window.innerHeight * 1.9, graphics.generateTexture());
		// terrain.anchor.set(0.5);
		// graphics.destroy();
		// this.physics.p2.enable(terrain, false);

		//terrain polygon
		// terrain.body.clearShapes();
		// console.log('points', poly.points);
		// console.log(createPlanet(octagonArray, 10, 250, 1.05));
		// let pointsArray = poly.points.map((el, i) => [el.x, el.y])
		// let arrOfCoords = createPlanet(octagonArray, 10, 250, 1.05)
		// let fn = function(number) {
		// 	return Math.ceil(number)
		// }
		// let coords = Array.prototype.slice.call(arrOfCoords).map(number => Math.ceil(number));
		// let coords = Array.from(arrOfCoords)
		// let coords2 = Object.keys(arrOfCoords).map(key => arrOfCoords[key]);
		// console.log(Object.keys(coords))
		// console.log(coords2)
		//terrain.body.addPolygon({}, coords);
		// terrain.x = window.innerWidth/2;
		// terrain.y = window.innerHeight * 1.7;
		//collision - terrain won't move when hit
		// game.load.physics('shipPhysics', 'tracedRocket.json');
		// terrain.body.clearShapes();
		// terrain.body.loadPolygon('shipPhysics', 'terrain');

		// === attempt at outlining the ship ====
		// ship.body.clearShapes();
		//this line throw error - can't read length of null
		// ship.body.loadPolygon('shipPhysics', 'ship');
		// ship.body.addPolygon('shipPhysics')
		// ship.body.loadPolygon('shipPhysics');

		// set boundaries on left and right of the screen
		var bounds = new Phaser.Rectangle(gameWidth/divide, 0, gameWidth/divide * (divide-2), gameHeight);
		customBounds = { left: null, right: null, top: null, bottom: null };
		this.createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);


    // creating static terrain
		terrain = this.add.sprite(window.innerWidth/2, window.innerHeight * 1.8, 'terrain');
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
    landingPad = this.add.sprite(gameWidth/1.5, window.innerHeight/3, 'landingPad');
    landingPad.scale.setTo(0.2, 0.2);
    this.physics.p2.enable(landingPad, false);
    landingPad.body.static = true;


		//create bounds on sides of screen
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);
		// ship.body.collides(boundsCollisionGroup, hitBounds, this);


    // add event to fade in landingPad
    this.time.events.add(Phaser.Timer.SECOND * timeElaspedBeforeLanding, this.showLandingPad, this);
    landingPad.alpha = 0;


    // create and set collision groups
		var terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		var shipCollisionGroup = this.physics.p2.createCollisionGroup();
		var landingPadCollisionGroup = this.physics.p2.createCollisionGroup();
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
  },

  // fade in landingPad
  showLandingPad: function() {
    this.game.add.tween(landingPad).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
  },

  hitTerrain: function(body1, body2) {
			console.log('hit terrain');

			//create explosion sprite for collision
			if (body1) {
				//get the coordinates of the ship before it's destroyed so we can place the explosion at the same position
				let posX = ship.x;
				let posY = ship.y;
				ship.destroy();
				explosion = this.add.sprite(posX - 30, posY, 'explosion')
				explosion.scale.setTo(0.05, 0.05);
        this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOverCrash, this);
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

	createPreviewBounds: function(x, y, w, h) {
			var sim = this.physics.p2;
			//  If you want to use your own collision group then set it here and un-comment the lines below
			var mask = sim.boundsCollisionGroup.mask;
			customBounds.left = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: 1.5707963267948966 });
			customBounds.left.addShape(new p2.Plane());
			// customBounds.left.shapes[0].collisionGroup = mask;
			customBounds.right = new p2.Body({ mass: 0, position: [ sim.pxmi(x + w), sim.pxmi(y) ], angle: -1.5707963267948966 });
			customBounds.right.addShape(new p2.Plane());
			// customBounds.right.shapes[0].collisionGroup = mask;
			// customBounds.top = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: -3.141592653589793 });
			// customBounds.top.addShape(new p2.Plane());
			// // customBounds.top.shapes[0].collisionGroup = mask;
			// customBounds.bottom = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y + h) ] });
			// customBounds.bottom.addShape(new p2.Plane());
			// // customBounds.bottom.shapes[0].collisionGroup = mask;
			sim.world.addBody(customBounds.left);
			sim.world.addBody(customBounds.right);
			// sim.world.addBody(customBounds.top);
			// sim.world.addBody(customBounds.bottom);
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
      if (ship.world.x <= gameWidth/divide + 100 && ship.body.rotation < 0) {
        terrain.body.rotation += 0.002;
      } else if (ship.world.x >= gameWidth/divide * (divide-1) - 110 && ship.body.rotation > 0) {
        terrain.body.rotation -= 0.002;
      }
      // terrain spins FASTER when rocket nears the edges
      if (ship.world.x <= gameWidth/divide + 50 && ship.body.rotation < 0) {
        terrain.body.rotation += 0.002;
      } else if (ship.world.x >= gameWidth/divide * (divide-1) - 60 && ship.body.rotation > 0) {
        terrain.body.rotation -= 0.002;
      }
    }
  },
};

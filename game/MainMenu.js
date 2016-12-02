LunarAdventure.MainMenu = function(){};

let putHasRun = false, submitBtnClicked = false, userName, input = null, achievedHighScore = false;

LunarAdventure.MainMenu.prototype = {
	create: function() {

		gameWidth = this.world.width;
		gameHeight = this.world.height;
		putHasRun = false, submitBtnClicked = false, userName, input = null, achievedHighScore = false;
		centerX = gameWidth/2
		centerY = gameHeight + 500
		cursors = this.input.keyboard.createCursorKeys();


		this.physics.startSystem(Phaser.Physics.P2JS);

		// this.background = this.game.add.tileSprite(0, 0, width, height, 'starfield');
		this.background = this.game.add.tileSprite(0, 0, 1300, 900, 'starfield');


		// astronaut = this.add.sprite(width/2 - 50, height/4.5, 'astronaut');
		astronaut = this.add.sprite(width/2.2 + 20, height/6, 'astronaut');

		astronaut.scale.setTo(0.5, 0.5);

		// logo = this.add.sprite(width/2 - 240, height/2.5, 'logo');
		logo = this.add.sprite(width/3 - 20, height/3, 'logo');

		logo.scale.setTo(0.8, 0.8);

		// creating static terrain
		terrain = this.add.sprite(width/2, height + 500, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');


		let singlePlayer = this.game.add.text(width/2.6, height/2.3, 'Single player', textStyle(height/40, 'white'));
		singlePlayer.inputEnabled = true;
		singlePlayer.events.onInputDown.add(this.startSinglePlayer, this);

		let multiPlayer = this.game.add.text(width/1.85, height/2.3, 'Cooperative', textStyle(height/40, 'white'));
		multiPlayer.inputEnabled = true;
		multiPlayer.events.onInputDown.add(this.startMultiPlayer, this);


		gyro.frequency = 10;
		// start gyroscope detection
		gyro.startTracking(function(o) {
			// console.log(o.gamma)
			// if (o.gamma > -30) {

			// }
			// // updating player velocity
			// player.body.velocity.x += o.gamma/20;
			// player.body.velocity.y += o.beta/20;
		});


		// ======== create ship ========
		ship = this.add.sprite(gameWidth/3.3, gameHeight/2.6, 'ship');
		ship.scale.setTo(0.06, 0.06);
		this.physics.p2.enable(ship, false);


		// ======== make collision groups ========
		terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		shipCollisionGroup = this.physics.p2.createCollisionGroup();

		// ======== set collision groups ========
		terrain.body.setCollisionGroup(terrainCollisionGroup);
		ship.body.setCollisionGroup(shipCollisionGroup);

		// ship and terrain collision
		terrain.body.collides([terrainCollisionGroup, shipCollisionGroup]);
		ship.body.collides(terrainCollisionGroup, this.hitTerrain, this);

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

		this.world.bringToTop(leftKeyUp);
		this.world.bringToTop(leftKeyDown);
		this.world.bringToTop(rightKeyUp);
		this.world.bringToTop(rightKeyDown);
		this.world.bringToTop(upKeyUp);
		this.world.bringToTop(upKeyDown);
		this.world.bringToTop(thrustUI);
		this.world.bringToTop(rotateRightUI);
		this.world.bringToTop(rotateLeftUI);
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);


		// // input form
		// this.game.add.plugin(Fabrique.Plugins.InputField);
		// input = this.game.add.inputField(width/2.3, height/1.6, {
		// 	font: '18px Arial',
		// 	fill: '#212121',
		// 	fontWeight: 'bold',
		// 	width: 150,
		// 	padding: 8,
		// 	borderWidth: 1,
		// 	borderColor: '#000',
		// 	borderRadius: 6
		// });
	},

	update: function() {
		terrain.body.rotation -= 0.003;
		this.background.tilePosition.x += 0.2;
		this.background.tilePosition.y -= 0.2;

		if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown) {
			this.physics.p2.gravity.y = 70;
		}
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
	},

	startSinglePlayer: function() {
		this.game.state.start('Game');
	},

	startMultiPlayer: function() {
		// if (input.value) {
			this.game.state.start('Multiplayer');
		// }
	}

};

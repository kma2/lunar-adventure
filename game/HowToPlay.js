LunarAdventure.HowToPlay = function(){};

LunarAdventure.HowToPlay.prototype = {
	create: function() {
		// ======== set up game world ========
		gameWidth = this.world.width;
		gameHeight = this.world.height;
		putHasRun = false, submitBtnClicked = false, userName, input = null, achievedHighScore = false;
		centerX = gameWidth/2;
		centerY = gameHeight + 500;
		cursors = this.input.keyboard.createCursorKeys();

		this.physics.startSystem(Phaser.Physics.P2JS);
		this.background = this.game.add.tileSprite(0, 0, 1300, 900, 'starfield');
		this.physics.p2.setBoundsToWorld(true, true, true, true, true);


		// ======== create terrain & ship ========
		terrain = this.add.sprite(width/2, height + 500, 'terrain');
		terrain.anchor.set(0.5)
		this.physics.p2.enable(terrain, false)
		terrain.body.static = true;
		terrain.body.clearShapes();
		terrain.body.loadPolygon('tracedTerrain', 'terrain');

		ship = this.add.sprite(gameWidth/3.6, gameHeight/6.2, 'ship');
		// ship.scale.setTo(0.06, 0.06);
		this.physics.p2.enable(ship, false);


		// ======== add assets and text ========
		logo = this.add.sprite(width/3 - 20, height/8.4, 'logo');
		logo.scale.setTo(0.8, 0.8);

		// text style
		let style = { font: '16pt Asap', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 440 };

		// how to play
		this.game.add.text(width/2.9, height/4.5, 'Objective:  Land safely on the landing pad while avoiding obstacles.', style);
		this.game.add.text(width/2.9, height/3, 'Watch out! Colliding with asteroids will cause a time penalty. If you collide with too many asteroids, your keys will become scrambled! Hitting the terrain will destroy your ship.', style);
		let backToMenu = this.game.add.text(width/2.25, height/2 + 30, 'back to menu', style);

		// backToMenu click handler
		backToMenu.inputEnabled = true;
		backToMenu.events.onInputDown.add(this.showMainMenu, this);


		// ======== make collision groups ========
		terrainCollisionGroup = this.physics.p2.createCollisionGroup();
		shipCollisionGroup = this.physics.p2.createCollisionGroup();

		terrain.body.setCollisionGroup(terrainCollisionGroup);
		ship.body.setCollisionGroup(shipCollisionGroup);

		terrain.body.collides([terrainCollisionGroup, shipCollisionGroup]);
		ship.body.collides(terrainCollisionGroup, this.hitTerrain, this);


		// ======== terrain bounce ========
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


		// ======== define key UI images ========
		leftKeyUp = this.add.sprite(centerX - 115, this.world.height - 120, 'leftKeyUp');
		leftKeyUp.scale.setTo(0.25, 0.25);
		leftKeyUp.visible = true;

		rightKeyUp = this.add.sprite(centerX + 48, this.world.height - 120, 'rightKeyUp');
		rightKeyUp.scale.setTo(0.25, 0.25);
		rightKeyUp.visible = true;

		upKeyUp = this.add.sprite(centerX - 35, this.world.height - 195, 'upKeyUp');
		upKeyUp.scale.setTo(0.25, 0.25);
		upKeyUp.visible = true;

		leftKeyDown = this.add.sprite(centerX - 115, this.world.height - 107, 'leftKeyDown');
		leftKeyDown.scale.setTo(0.25, 0.25);
		leftKeyDown.visible = false;

		rightKeyDown = this.add.sprite(centerX + 48, this.world.height - 107, 'rightKeyDown');
		rightKeyDown.scale.setTo(0.25, 0.25);
		rightKeyDown.visible = false;

		upKeyDown = this.add.sprite(centerX - 35, this.world.height - 182, 'upKeyDown');
		upKeyDown.scale.setTo(0.25, 0.25);
		upKeyDown.visible = false;

		thrustUI = this.add.sprite(centerX - 35, this.world.height - 215, 'thrust');
		thrustUI.scale.setTo(0.25, 0.25);

		rotateRightUI = this.add.sprite(centerX + 48, this.world.height - 40, 'rotateR');
		rotateRightUI.scale.setTo(0.25, 0.25);

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
	},

	update: function() {
		terrain.body.rotation -= 0.003;
		// this.background.tilePosition.x += 0.2;
		// this.background.tilePosition.y -= 0.2;

		// ======== key controls ========
		if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown) {
			this.physics.p2.gravity.y = 70;
		}
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
		if (ship.body.rotation < -3.15) {
			ship.body.rotation = 3.15;
		}
		if (ship.body.rotation > 3.15) {
			ship.body.rotation = -3.15;
		}
	},

	showMainMenu: function() {
		this.game.state.start('MainMenu');
	}
};

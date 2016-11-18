// const Ship = ('./lander');
//cant use require on browser side - if want this file bring it in another way

function createShip(pixiObj) {
	pixiObj.position = {x:5, y: -window.innerHeight / 1.5};
	pixiObj.velocity = {x:0, y:0};
	pixiObj.rotation = 0;
	pixiObj.rotationSpeed = .15;
	pixiObj.speed = 0.15;
	pixiObj.inertia = 0.99;
	//was 0.035
	pixiObj.gravity = 0.005;
	pixiObj.radius = 20;
	pixiObj.rotate = function(direction) {
		if(direction === 'right') {
			this.rotation += this.rotationSpeed
		}
		else if (direction === 'left') {
			this.rotation -= this.rotationSpeed
		}
	}
	pixiObj.accelerate = function() {
		this.velocity.x -= Math.sin(-1 *  this.rotation * (Math.PI/180)) * this.speed
		this.velocity.y -= Math.cos(-1 *  this.rotation * (Math.PI/180)) * this.speed
	}
}
// event.clientX and event.clientY to get coordinates on event of box item
// Math.atan - returns angle in radians
// Ship.prototype.rotate = function(direction) {
// 	if(direction === 'right') {
// 		this.rotation += this.rotationSpeed
// 	}
// 	else if (direction === 'left') {
// 		this.rotation -= this.rotationSpeed
// 	}
// }

// Ship.prototype.accelerate = function() {
// 	 this.velocity.x -= Math.sin(-1 *  this.rotation * (Math.PI/180)) * this.speed
// 	 this.velocity.y -= Math.cos(-1 *  this.rotation * (Math.PI/180)) * this.speed
// }

// let ourShip = new Ship();
// ourShip.ship = {}

function init() {
// keyState object to check keydown / keyup status
	var keyState = {};

	// create renderer
	var renderer = PIXI.autoDetectRenderer(window.innerWidth-5, window.innerHeight-5, {antialias: false, transparent: false, resolution: 1});
	renderer.backgroundColor = 0x444444;
// renderer.autoResize = true;
	document.body.appendChild(renderer.view);

	//Create a container object called the `stage` (camera)
	var stage = new PIXI.Container();
	stage.position.x = window.innerWidth / 2 ;
	stage.position.y = window.innerHeight;
	stage.velocity = 0;



	// load images
	PIXI.loader
		.add('planet2.png')
		.add('rocket.png')
		.load(setup);


	//This `setup` function will run when the image has loaded
	var planet, ship
	function setup() {

  	//Create the `planet` sprite from the texture
  	planet = new PIXI.Sprite( PIXI.loader.resources["planet2.png"].texture );
		planet.position.x = 0;
		planet.position.y = 1700;

		//anchor will be needed to calculate the axis of rotation
		planet.anchor.x = 0.5;
		planet.anchor.y = 0.5;

		//size
		planet.width = 4000;
		planet.height = 4000;

		//radius will be very important to detect the collision
		planet.radius = 500;

		//create rocket
		ship = new PIXI.Sprite( PIXI.loader.resources["rocket.png"].texture )
		createShip(ship)
		// rocket.position.x = 0// window.innerWidth / 2 
		// rocket.position.y = -window.innerHeight / 1.5;
		ship.anchor.x = 0.5;
		ship.anchor.y = 0.5;
		ship.width = 40;
		ship.height = 100;
		// console.log('the ship', ship.velocity.y)

		//radius will be very important to detect the collision
		ship.radius = 10;

	  //Add the planet and rocket to the stage
	  stage.addChild(planet);
	  stage.addChild(ship)

	  gameLoop()
	}

	window.addEventListener('keydown', function (e) {
	    var key = e.keyCode;
	    keyState[event.keyCode || event.which] = true;
	})

	window.addEventListener('keyup', function (e) {
	    var key = e.keyCode;
	    keyState[event.keyCode || event.which] = false;
	})
	//left = 37 65
	//right = 39 68
	//up = 38 or 87

	function checkKeyStates () {
		if (keyState[38] || keyState[87]) {
			// console.log('up key pressed')
			ship.accelerate()
			// console.log(ship.velocity.y)
		}
		if (keyState[37] || keyState[65]) {
			// console.log('left key pressed')
			ship.rotate('left')
		}
		if (keyState[39] || keyState[68]) {
			// console.log('right key pressed')
			ship.rotate('right')
		}
		// if (keyState[40] || keyState[83]) ship.position.y += 10;
		// if (keyState[37] || keyState[65]) {
		// 	if (ship.rotation > -0.5) ship.rotation -= 0.1;	
		// 	if (ship.position.x > -400)	{
		// 		// ship.velocity += 0.05;
	 //  		ship.position.x -= 10;
	 //  		// ship.position.x -= Math.abs(ship.velocity);
	 //  	} else { 
	 //  		planet.rotation += 0.01;
	 //  	}    
		// }
		// if (keyState[39] || keyState[68]) {
		// 	if (ship.rotation < 0.5) ship.rotation += 0.1;
		// 	if (ship.position.x < 400)	{
		// 		// ship.velocity -= 0.05;
	 //  		ship.position.x += 10
	 //  		// ship.position.x += Math.abs(ship.velocity);
	 //  	} else { 
	 //  		stage.velocity = 0.01;
	 //  		planet.rotation -= stage.velocity;
	 //  	}
		// }

		// make ship straight when all keys are up
		// if (ship.rotation !== 0 && (!keyState[37] && !keyState[65] && !keyState[39] && !keyState[68])) {
		// 	if (ship.rotation < 0) ship.rotation += 0.01;
		// 	else ship.rotation -= 0.01;
		// }
	};

	//Loop this function 60 times per second
	function gameLoop(){

	
		console.log(ship.position)
	

	  requestAnimationFrame(gameLoop);
	  requestAnimationFrame(checkKeyStates);
	  
	  // gravity
	  ship.position.x += ship.velocity.x
	  ship.position.y += ship.velocity.y
	  // console.log(ship.velocity.y)
	  ship.velocity.x *= ship.inertia
	  ship.velocity.y += ship.gravity
	  ship.velocity.y *= ship.inertia
	  // ship.position.y += 0.2;

	  //Render the stage
	  renderer.render(stage);
	}
}
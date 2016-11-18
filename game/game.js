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
	var planet, rocket
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
		rocket = new PIXI.Sprite( PIXI.loader.resources["rocket.png"].texture )
		rocket.position.x = 0// window.innerWidth / 2 
		rocket.position.y = -window.innerHeight / 1.5;
		rocket.anchor.x = 0.5;
		rocket.anchor.y = 0.5;
		rocket.width = 40;
		rocket.height = 100;
		rocket.velocity = 0

		//radius will be very important to detect the collision
		rocket.radius = 10;

	  //Add the planet and rocket to the stage
	  stage.addChild(planet);
	  stage.addChild(rocket)

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


	function checkKeyStates () {
		if (keyState[38] || keyState[87]) rocket.position.y -= 10;
		if (keyState[40] || keyState[83]) rocket.position.y += 10;
		if (keyState[37] || keyState[65]) {
			if (rocket.rotation > -0.5) rocket.rotation -= 0.1;	
			if (rocket.position.x > -400)	{
				// rocket.velocity += 0.05;
	  		rocket.position.x -= 10;
	  		// rocket.position.x -= Math.abs(rocket.velocity);
	  	} else { 
	  		planet.rotation += 0.01;
	  	}    
		}
		if (keyState[39] || keyState[68]) {
			if (rocket.rotation < 0.5) rocket.rotation += 0.1;
			if (rocket.position.x < 400)	{
				// rocket.velocity -= 0.05;
	  		rocket.position.x += 10
	  		// rocket.position.x += Math.abs(rocket.velocity);
	  	} else { 
	  		stage.velocity = 0.01;
	  		planet.rotation -= stage.velocity;
	  	}
		}

		// make rocket straight when all keys are up
		if (rocket.rotation !== 0 && (!keyState[37] && !keyState[65] && !keyState[39] && !keyState[68])) {
			if (rocket.rotation < 0) rocket.rotation += 0.01;
			else rocket.rotation -= 0.01;
		}
	};

	//Loop this function 60 times per second
	function gameLoop(){
	  requestAnimationFrame(gameLoop);
	  requestAnimationFrame(checkKeyStates);
	  
	  // gravity
	  rocket.position.y += 0.2;

	  //Render the stage
	  renderer.render(stage);
	}
}
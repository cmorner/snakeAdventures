var sa = sa || {};

sa.main = (function () {
	var obj = {};

	var score = 0;

	var currentIntervalId;

	var gameFieldCellsArray = [];

	// Width of game in nr of cells
	var gameDimension;



	obj.init = function () {
		score = 0;

		// Resets snakearray to snakeStartArray
		sa.snake.reset();

		// Gets the current frame which is an object specifying the obstacles coordinates and possible 
		// framechanges from the current frame
		sa.frame.reset()
		var firstFrame = sa.frame.getCurrentFrame();

		// Get gameDimension based of width of canvas / Width of a cell
		gameDimension = sa.canvas.getNrOfCells();

		gameFieldCellsArray = obj.createGameFieldCellsArray(gameDimension);

		// Add eventlisteners to keydown
		sa.controls.bindKeyEvents();

		// Generate the initial food Coordinates based based on available coordinates
		//sa.food.generate(gameFieldCellsArray);

		// Load obstacles object into obstacles module
		sa.obstacles.setObstaclesArray(firstFrame.obstaclesArray);

	}

	// Creates an array holding cells of position objects
	// such as {x: 2, y: 10} and is used to keep track of empty cells where new food
	// can be generated
	obj.createGameFieldCellsArray = function (dimension) {
		var array = [];

		for (var i = 0; i < dimension - 1; i++) {
			for (var n = 0; n < dimension; n++) {
				array.push({x: i, y: n});
			}
		}

		return array;
	}

	obj.changeFrame = function (direction) {
		var newFrameObj = sa.frame.changeFrame(direction);
		sa.obstacles.setObstaclesArray(newFrameObj.obstaclesArray);
	}

	obj.handleSnakeMovement = function () {}

	obj.gameLoop = function () {
		// Unlocks lock that prevents user from changing direction more than once per frame
		sa.controls.unlockDirectionChange();

		var foodCoords = sa.food.current(); // Only needs to be updated if frameChange or new food
		var obstaclesArray = sa.obstacles.getObstacles(); // Only needs to be updated if Frame change

		var newpos = sa.snake.createNewPos();
		
		var selfCollision = sa.snake.checkCollision(newpos);
		var obstacleCollision = sa.obstacles.testCollision(newpos);

		var foodCollision = sa.food.hit(newpos);


		// check the new position of snake head to see if we need to initiate a frame change
/*		if (newpos.x < 0) {
			sa.snake.changeFrame('left', 45);
			newpos.x = newpos.x + 45;
			console.log('gameloop this', this);
			obj.changeFrame('left');
		} else if (newpos.x > 45) {
			console.log(1);
			sa.snake.changeFrame('right', 45);
			newpos.x = newpos.x - 45;
			obj.changeFrame('right');
		} else if (newpos.y < 0) {
			sa.snake.changeFrame('up', 45);
			newpos.y = newpos.y + 45;
			obj.changeFrame('up');
		} else if (newpos.y > 45) {
			sa.snake.changeFrame('down', 45);
			newpos.y = newpos.y - 45;
			obj.changeFrame('down');
		}*/
		
		var snakeArray = sa.snake.getSnakeArray();

		if (foodCollision) { 
			sa.snake.growSnake(newpos)
			sa.food.generate(gameFieldCellsArray);
			score = score + 1;
			sa.snake.log();
		} else if (selfCollision || obstacleCollision) {
			obj.restart();
			return
		} else {
			sa.snake.moveSnake(newpos);
		}

		sa.canvas.drawGame(snakeArray, obstaclesArray, foodCoords, score) // Draw game
	}

	// Resets everything that has been changed to original settings
	obj.restart = function () {
		// Stops gameloop
		clearInterval(currentIntervalId);
		

		//sa.obstacles.setObstaclesArray(firstFrame.obstaclesArray);

		this.start();
	}

	obj.start = function () {
		console.log('init this', this);
		this.init();
		currentIntervalId = setInterval(this.gameLoop, 60);
	}

	return obj;
})();

sa.main.start();
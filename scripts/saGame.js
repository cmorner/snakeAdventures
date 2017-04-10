var sa = sa || {};

sa.main = (function () {
	var obj = {};

	var score = 0;

	var currentIntervalId;
	var intervalRate = 60;
	var activeInterval = true;

	var gameFieldCellsArray = [];

	// Width of game in nr of cells
	var gameDimension;

	var firstRun = true;

	var audioElement = document.getElementById('audio');
	audioElement.currentTime = 40;


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

		// Load obstacles object into obstacles module
		sa.obstacles.setObstaclesArray(firstFrame.obstaclesArray);

		// Remove obstacles cells from the array of possibles positions for food to be generated to
		this.removeGameFieldCells(sa.obstacles.getObstacles());
		
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

	// Takes an Array of cells to remove from gameFieldCellsArray
	obj.removeGameFieldCells = function (cellsToRemove) {
		// Gå igenom alla celler som finns för tex hindren och ta bort celler från
		// Game field arrayen en efter en 
		for (var i = 0; i < cellsToRemove.length ; i++) {

			var indexCounter = gameFieldCellsArray.length;
			for (var n = 0; n < indexCounter; n++) {
				if (gameFieldCellsArray[n].x == cellsToRemove[i].x && 
					gameFieldCellsArray[n].y == cellsToRemove[i].y) {
					gameFieldCellsArray.splice(n, 1);
					break;
				}
			}
		}
	}

	obj.changeFrame = function (direction) {
		var newFrameObj = sa.frame.changeFrame(direction);

		// Reset gameFieldCellsArray
		gameFieldCellsArray = obj.createGameFieldCellsArray(45);

		sa.obstacles.setObstaclesArray(newFrameObj.obstaclesArray);

		// Remove gameFieldCells for the new frame
		obj.removeGameFieldCells(sa.obstacles.getObstacles());

		// Generate new food within the new frame
		sa.food.generate(gameFieldCellsArray);
	}

	obj.handleSnakeMovement = function () {}

	obj.gameLoop = function () {

		var foodCoords = sa.food.current(); // Only needs to be updated if frameChange or new food
		var obstaclesArray = sa.obstacles.getObstacles(); // Only needs to be updated if Frame change


		if (sa.autoplay.active()) {
			// Calculate newDirection takes headPosition, foodposition
			var snakeHead = sa.snake.getSnakeHead();
			//var currentDirection = sa.snake.getDirection();
			var newDirection = sa.autoplay.calculateNewDirection(snakeHead, foodCoords);
			//sa.snake.setDirection(newDirection);
		} else {
			// Unlocks lock that prevents user from changing direction more than once per frame
			sa.controls.unlockDirectionChange();
		}



		var newpos = sa.snake.createNewPos();
		
		var selfCollision = sa.snake.checkCollision(newpos);
		var obstacleCollision = sa.obstacles.testCollision(newpos);

		var foodCollision = sa.food.hit(newpos);


		// check the new position of snake head to see if we need to initiate a frame change
		if (newpos.x < 0) {
			sa.snake.changeFrame('left', 45);
			newpos.x = newpos.x + 45;
			obj.changeFrame('left');
		} else if (newpos.x > 45) {
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
		}
		
		var snakeArray = sa.snake.getSnakeArray();


		if (foodCollision) { 
			sa.snake.growSnake(newpos)
			sa.food.generate(gameFieldCellsArray);
			score = score + 1;
			// if score is 10 open door
			if (score==10) {
				sa.frame.openDoorX0Y0();
			}
			//audioElement.play();
		} else if (selfCollision || obstacleCollision) {
			obj.restart();
			return
		} else {
			sa.snake.moveSnake(newpos);
		}


		// Draw game
		sa.canvas.drawGame(snakeArray, obstaclesArray, foodCoords, score)
		
		if (firstRun) {
			obj.togglePause();
			firstRun = false;
		}

	}
	

	// Resets everything that has been changed to original settings
	obj.restart = function () {
		// Stops gameloop
		clearInterval(currentIntervalId);
		
		//Rebuild frames
		sa.frame.buildFrameX0Y0(45);

		// If snake dies when autoplay is active shutoff autoplay
		if (sa.autoplay.active()) sa.autoplay.toggleAutoplay(); 

		this.start();
	}

	obj.togglePause = function () {
		var pauseStatusElement = document.getElementById('pause_status');
		if (activeInterval) {
			clearInterval(currentIntervalId);
			activeInterval = false;
			pauseStatusElement.innerText = 'paused'; // Set text of html element
		//audioElement.pause();
		} else {
			console.log('activeInterval ', activeInterval);
			activeInterval = true;
			currentIntervalId = setInterval(this.gameLoop, intervalRate);
			pauseStatusElement.innerText = 'unpaused'; // Set text of html element
			//if (musicActivated) {
			//	audioElement.play();
			//}
		}
	}

	obj.start = function () {
		this.init();
		currentIntervalId = setInterval(this.gameLoop, intervalRate);
	}

	return obj;
})();

sa.main.start();

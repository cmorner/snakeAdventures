var sa = sa || {};

sa.main = (function () {
	var obj = {};

	var score = 0;

	var currentIntervalId;

	obj.init = function () {
		var firstFrame = sa.frame.getCurrentFrame();
		sa.obstacles.setObstaclesArray(firstFrame.obstaclesArray);
	}

	obj.changeFrame = function (direction) {
		var newFrameObj = sa.frame.changeFrame(direction);
		sa.obstacles.setObstaclesArray(newFrameObj.obstaclesArray);
	}

	obj.handleSnakeMovement = function () {}

	obj.gameLoop = function () {
		var foodCoords = sa.food.current(); // Only needs to be updated if frameChange or new food
		var obstaclesArray = sa.obstacles.getObstacles(); // Only needs to be updated if Frame change

		var newpos = sa.snake.createNewPos();
		var selfCollision = sa.snake.checkCollision(newpos);
		var foodCollision = sa.food.hit(newpos);

		// check the new position of snake head to see if we need to initiate a frame change
		if (newpos.x < 0) {
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
		}
		
		var snakeArray = sa.snake.getSnakeArray();

		if (foodCollision) {
			sa.snake.growSnake(newpos)
			score = score + 1;
		} else if (selfCollision) {
			console.log(this);
		} else {
			sa.snake.moveSnake(newpos);
		}

		console.log(this);
		sa.canvas.drawGame(snakeArray, obstaclesArray, foodCoords, score) // Draw game
	}

	obj.restart = function () {
		clearInterval(currentIntervalId);

		score = 0;
		
		sa.frames.reset();
		var firstFrame = sa.frame.getCurrentFrame()
		
		sa.snake.reset();
		sa.obstacles.setObstaclesArray(firstFrame.obstaclesArray);

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
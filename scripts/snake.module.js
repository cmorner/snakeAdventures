var sa = sa || {};

sa.snake = (function () {
	var snakeArray = [{x:0, y:0}, {x: 1, y:0}, {x: 2, y:0}, {x: 3, y:0}, {x: 4, y:0}];
	var direction = 'right';

	var obj = {};

	obj.getSnakeArray = function () {
		return snakeArray;
	}

	obj.getLength = function () {
		return snakeArray.length;
	}
	obj.setDirection = function (newDirection) {
		direction = newDirection;
	}

	// Creates a new snake objec based on direction
	obj.createNewPos = function () {
		var nx,
			ny,
			headIndex = this.getLength() - 1;
		switch (direction) {
			case 'left':
				nx = snakeArray[headIndex].x-1;
				ny = snakeArray[headIndex].y;
				break;
			case 'up':
				nx = snakeArray[headIndex].x;
				ny = snakeArray[headIndex].y-1;
				break;
			case 'right':
				nx = snakeArray[headIndex].x+1;
				ny = snakeArray[headIndex].y;
				break;
			case 'down':
				nx = snakeArray[headIndex].x;
				ny = snakeArray[headIndex].y+1;
				break;
		}

		return {x: nx, y: ny};
	}

	obj.growSnake = function (newPosObject) {
		this.moveSnake(newPosObject, true);
	}

	obj.moveSnake = function (newPosObject, grow) {
		if (!grow) {
			snakeArray.shift();
		}
		snakeArray.push(newPosObject);
	}

	// 
	obj.checkCollision = function (posObj) {
		var i,
			snakeLength = this.getLength(),
			x = posObj.x,
			y = posObj.y;

		var partx, party;
		for (i = 0; i < snakeLength - 1; i++) {
			partx = snakeArray[i].x;
			party = snakeArray[i].y;
			if (x == partx && party == y) {
				return true;
			}
		}
		return false;
	}

	obj.changeFrame = function (direction, gridWidth) {
		var len = this.getLength(), i;
		switch (direction) {
			case 'left':
				for (i = 0; i < len; i++) {
					snakeArray[i].x = snakeArray[i].x + gridWidth; 
				}
				break;
			case 'up':
				for (i = 0; i < len; i++) {
					snakeArray[i].y = snakeArray[i].y + gridWidth; 
				}
				break;
			case 'right':
				for (i = 0; i < len; i++) {
					snakeArray[i].x = snakeArray[i].x - gridWidth; 
				}
				break;
			case 'down':
				for (i = 0; i < len; i++) {
					snakeArray[i].y = snakeArray[i].y - gridWidth; 
				}
				break;
		}
	}

	return obj;
})();

(function () {

	setInterval(gameLoop, 60);

	// Setup
	var c = sa.canvas;

	function gameLoop () {
		var foodCoords = sa.food.current();
		var obstaclesArray = sa.obstacles.getObstacles();
		
		var newpos = sa.snake.createNewPos();
		var selfCollision = sa.snake.checkCollision(newpos);
		var foodCollision = sa.food.hit(newpos);
		
		function checkForFrameChange (newpos) {
			if (newpos.x < 0) {
				sa.snake.changeFrame('left', 45);
				newpos.x = newpos.x + 45;
			} else if (newpos.x > 45) {
				sa.snake.changeFrame('right', 45);
				newpos.x = newpos.x - 45;
			} else if (newpos.y < 0) {
				sa.snake.changeFrame('up', 45);
				newpos.y = newpos.y + 45;
			} else if (newpos.y > 45) {
				sa.snake.changeFrame('down', 45);
				newpos.y = newpos.y - 45;
			}
		}

		var snakeArray = sa.snake.getSnakeArray();

		if (foodCollision) {
			sa.snake.growSnake(newpos)
		} else if (selfCollision) {
			console.log('you died');
			sa.snake.moveSnake(newpos);
		} else {
			sa.snake.moveSnake(newpos);
		}

		//
		c.drawBg().paintScore(10);
		c.drawFood(foodCoords);
		c.drawObstacles(obstaclesArray);
		c.drawSnake(snakeArray);
	}

})();
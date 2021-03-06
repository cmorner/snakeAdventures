var sa = sa || {};

sa.snake = (function () {
	var snakeArray = [{x:0, y:4}, {x: 1, y:4}, {x: 2, y:4}, {x: 3, y:4}, {x: 4, y:4}];
	var direction = 'right';

	var obj = {};

	obj.reset = function () {
		snakeArray = [{x:0, y:4}, {x: 1, y:4}, {x: 2, y:4}, {x: 3, y:4}, {x: 4, y:4}];
		direction = 'right';

	}

	obj.getStartSnakeArray = function () {
		snakeArray = [{x:0, y:4}, {x: 1, y:4}, {x: 2, y:4}, {x: 3, y:4}, {x: 4, y:4}];
		return snakeArray;
	}

	obj.createAutoplaySnake = function () {
		var length = snakeArray.length;
		console.log('snakeArray: ', snakeArray);
		snakeArray = snakeArray.splice(snakeArray.length-1, 1);
		console.log('snakeArray: ', snakeArray);
	}

	obj.getSnakeHead = function () {
		return snakeArray[snakeArray.length-1];
	}

	obj.getSnakeArray = function () {
		return snakeArray;
	}

	obj.getLength = function () {
		return snakeArray.length;
	}
	obj.setDirection = function (newDirection) {
		direction = newDirection;
	}

	obj.getDirection = function () {
		return direction;
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
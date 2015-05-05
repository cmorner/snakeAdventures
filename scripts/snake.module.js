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
	obj.setDirection = function (direction) {
		direction = direction;
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

	obj.moveSnake = function (newPosObject) {
		snakeArray.shift();
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

	obj.changeFrame = function (direction) {
		var len = this.getLength;
		switch (direction) {
			case 'left':
				break;
			case 'top':
				break;
			case 'right':
				break;
			case 'down':
				break;
		}
	}

	return obj;
})();

(function () {
	var newpos = sa.snake.createNewPos();
	console.log(newpos);
	var collision = sa.snake.checkCollision(newpos);
	// Food
	// Change Frame
	// Wallcollide
	console.log(collision);
	sa.snake.moveSnake(newpos);

	// Draw snake
	var snakeArray = sa.snake.getSnakeArray();


	var c = sa.canvas;

	// drawBg
	c.drawBg().paintScore(10);
	c.drawSnake(snakeArray);

})();
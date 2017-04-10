var sa = sa || {};

sa.autoplay = (function () {
	var obj = {};

	var autoplayActivated = false;

	var autoplayStatusTextElement = document.getElementById('autoplay_status');

	var decisionMemory = [];

	// Activate autoplay
	obj.toggleAutoplay = function () {
		if (autoplayActivated) {
			autoplayActivated = false;
			autoplayStatusTextElement.innerText = 'deactivated';
			console.log('autoplaydeActivated');
		} else {
			autoplayActivated = true;
			sa.controls.lockDirectionChange();
			//sa.snake.createAutoplaySnake();
			autoplayStatusTextElement.innerText = 'activated';
			console.log('autoplayActivated');
		}
	}

	obj.active = function () {
		return autoplayActivated;
	}

	// Function to make the snakes next decision
	obj.calculateNewDirection = function (headPosition, foodPosition, currentDirection) {
		var newDirection,
			possibleNewPositions = [],
			possibleNewPositionDistanceFromFood = [],// option1, option2 and option3 stores distance from food
			directionsIndex = [];// Remember what index is connected to what change in direction

		switch (currentDirection) {
			case 'up':
				// Go left relative to head
				possibleNewPositions.push({x:headPosition.x-1, y:headPosition.y});
				// Go up
				possibleNewPositions.push({x:headPosition.x, y:headPosition.y-1});
				// Go right relative to heads direction
				possibleNewPositions.push({x:headPosition.x+1, y:headPosition.y});
				directionsIndex = ['left', 'up', 'right'];
				break;
			case 'right':
				// Go up
				possibleNewPositions.push({x:headPosition.x, y:headPosition.y-1});
				// Go right
				possibleNewPositions.push({x:headPosition.x+1, y:headPosition.y});
				// Go down
				possibleNewPositions.push({x:headPosition.x, y:headPosition.y+1});
				directionsIndex = ['up', 'right', 'down'];
				break;
			case 'down':
				// Go right
				possibleNewPositions.push({x:headPosition.x+1, y:headPosition.y});
				// Go down
				possibleNewPositions.push({x:headPosition.x, y:headPosition.y+1});
				// Go left
				possibleNewPositions.push({x:headPosition.x-1, y:headPosition.y});
				directionsIndex = ['right', 'down', 'left'];
				break;
			case 'left':
				// Go down
				possibleNewPositions.push({x:headPosition.x, y:headPosition.y+1});
				// Go left
				possibleNewPositions.push({x:headPosition.x-1, y:headPosition.y});
				// Go up
				possibleNewPositions.push({x:headPosition.x, y:headPosition.y-1});
				directionsIndex = ['down', 'left', 'up'];
				break;

		}

		// Kolla om någon position orsakar en kollision
		var obstacleCollision, selfCollision, possibleNewPosition;
		for (var i=0; i<possibleNewPositions.length;i++) {
			possibleNewPosition = possibleNewPositions[i];
			// Check for obstacleCollision
			obstacleCollision = sa.obstacles.testCollision(possibleNewPosition);
			
			// Check if next position runs into the snake itself
			selfCollision = sa.snake.checkCollision(possibleNewPosition);

			// Only consider the newposition if it isnt occupied by an obstacle
			if (obstacleCollision || selfCollision) {
				// If there is an obstaclecollision we put a high number just to keep track of the relative
				// indexes between new possible positions and their respective distance to food
				possibleNewPositionDistanceFromFood.push(99999);
			} else {
				// calculate distance from newPosition to currentFoodPosition
				var distanceToFood, distanceX, distanceY;
				distanceX = possibleNewPosition.x - foodPosition.x;
				distanceY = possibleNewPosition.y - foodPosition.y;

				distanceToFood = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
				possibleNewPositionDistanceFromFood.push(distanceToFood);

			}
			//var selfCollision = sa.snake.checkCollision(newpos);
		}

		// Choose the newPosition that is closest to food
		// By comparing the thre possibles alternatives relative to each other
		var np = possibleNewPositionDistanceFromFood;
		console.log(np, directionsIndex);
		if (np[0] <= np[1] && np[0] <= np[2]) {
			newDirection = directionsIndex[0];
		} else if (np[1] <= np[0] && np[1] <= np[2]) {
			newDirection = directionsIndex[1];
		} else {
			newDirection = directionsIndex[2];
		}

		// Nu behöver jag ha någon slags koppling mellan den bästa punkten tillbaka till vilket riktnings
		// alternativ det innebar

		return newDirection;
	}


	return obj;
})();
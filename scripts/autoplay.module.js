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
		} else {
			autoplayActivated = true;
			sa.controls.lockDirectionChange();
			//sa.snake.createAutoplaySnake();
			autoplayStatusTextElement.innerText = 'activated';
		}
	}

	obj.active = function () {
		return autoplayActivated;
	}

	// Function to make the snakes next decision
	obj.calculateNewDirection = function (headPosition, foodPosition, currentDirection, recursiveCall) {
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

		var np = possibleNewPositionDistanceFromFood,
			pointArray;
		// Second level check
		// checking to see if any of the positions will kill the snake in the next step
		if (!recursiveCall) {
			for (var i=0; i<possibleNewPositions.length;i++) {
				// If point is obstacles no need to check
				if (np[i] == 99999) continue;

				pointArray = obj.calculateNewDirection(possibleNewPositions[i], foodPosition, directionsIndex[i], true)[1];
				// If point np[i] does not have any possible ways from it which is checked
				// by recursively calling calculateNewDirection we will say the point is the
				// Same as an obstacle
				if (99999 == pointArray[0] && 99999 == pointArray[1] && 99999 == pointArray[2]) {
					np[i] = 99999;
					console.log('this happended!');
				}
			}
		}



		// Choose the newPosition that is closest to food
		// By comparing the thre possibles alternatives relative to each other
		
		if (np[0] <= np[1] && np[0] <= np[2]) {
			newDirection = directionsIndex[0];
		} else if (np[1] <= np[0] && np[1] <= np[2]) {
			newDirection = directionsIndex[1];
		} else {
			newDirection = directionsIndex[2];
		}

		// 

		return [newDirection, np];
	}


	// jag behöver se om den punkten som vid första anblick verkar bra det utifrån den 
	// bara finns obstacles så bör den punkten betraktas lika illa som att åka in i ett hinder direkt
	// Jag tänker göra detta med ett rekursivt anrop och en blockering i koden som 
	// ser till så att jag inte hamnar i en evighetsloop

	// Koden tar de punkterna som inte är 9999 och gör en check 


	// Here we check if all values in array is 99999 (obstacle)
	obj.checkValuesInArray = function () {

	}


	return obj;
})();
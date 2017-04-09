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
			sa.snake.createAutoplaySnake();
			autoplayStatusTextElement.innerText = 'activated';
			console.log('autoplayActivated');
		}
	}

	obj.active = function () {
		return autoplayActivated;
	}

	// Function to make the snakes next decision
	obj.calculateNewDirection = function (headPosition, foodPosition) {
		var newDirection,
			option1,// option1, option2 and option3 stores distance from food
			option2,
			option3;



		console.log(headPosition, foodPosition);

		var selfCollision = sa.snake.checkCollision(newpos);
		var obstacleCollision = sa.obstacles.testCollision(newpos);

		// Check if snake is about to hit a wall

		// Snake needs to avoid death and find food
		// Snake needs to check where its going to see if that is a wall
		// If that is a wall it needs to se if left or right is a wall and choose the
		// direction that leads to the food
		// If both directions are equally good snake needs to make a decision anyway
		// preferably the first choice
		// If snake heads opposite way of food it needs to make decision to turn around
		// which includes a two step process by turning up or down and then start heading
		// in the direction of the food


		return newDirection;
	}


	return obj;
})();
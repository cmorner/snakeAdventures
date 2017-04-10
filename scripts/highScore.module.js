var sa = sa || {};

sa.highScore = (function () {
	var obj = {};

	// Used to keep track of when user is viewing a highscore snake
	var viewHighScoreSnakeActivated = false; 

	obj.setHighScore = function (highScore, highScoreSnakeArray, highScoreFoodPosition) {
		localStorage.setItem('highScore', highScore);
		localStorage.setItem('highScoreSnakeArray', JSON.stringify(highScoreSnakeArray));
		localStorage.setItem('highScoreFoodPosition', JSON.stringify(highScoreFoodPosition));
	}

	// Returns a javascript array
	obj.getHighScoreSnake = function () {
		return JSON.parse(localStorage.getItem('highScoreSnakeArray'));
	}

	obj.getHighScoreFoodPosition = function () {
		return JSON.parse(localStorage.getItem('highScoreFoodPosition'));
	}

	// Check if there is a stored highscore in localStorage
	// Else set a high score of 0 and a starting snakeArray in localstorage
	obj.getHighScore = function () {
		var highScore,
			storedHighScore;

		storedHighScore = localStorage.getItem('highScore');
		if (storedHighScore) {
			return storedHighScore;
		} else {
			obj.setHighScore(0, sa.snake.getStartSnakeArray(), sa.food.getCurrentFood());
			return 0;
		}
	}

	obj.viewHighScoreSnakeActivated = function () {
		return viewHighScoreSnakeActivated;
	}

	// Retrieve highScoreSnake and draw it out and pause game
	obj.viewHighScoreSnake = function () {
		var highScoreSnake = obj.getHighScoreSnake();
		var foodCoords = obj.getHighScoreFoodPosition();
		var obstaclesArray = sa.obstacles.getObstacles();
		var score = obj.getHighScore();

		sa.canvas.drawGame(highScoreSnake, obstaclesArray, foodCoords, score)
		// Only pause if there is a running interval othervice pause is already
		// Activated and the highScore snake will only flash
		
		if (!viewHighScoreSnakeActivated && sa.main.pauseActivated()) {
			viewHighScoreSnakeActivated = true;
		} else if (!viewHighScoreSnakeActivated && !sa.main.pauseActivated()) {
			sa.main.togglePause();
			viewHighScoreSnakeActivated = true;
		} else if (viewHighScoreSnakeActivated) {
			sa.main.togglePause();
			viewHighScoreSnakeActivated = false;
		}

	}

	return obj;
})();
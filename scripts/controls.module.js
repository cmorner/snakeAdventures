var sa = sa || {};

sa.controls = (function () {
	var obj = {}

	// Variable used to make sure user can't change direction 2 times in one frame
	// Enabling them to crash into themselves
	var directionChangeLocked = false;

	obj.bindKeyEvents = function () {
		// binds a handler to the keydown event to set snake direction
		document.onkeydown = function (e) {
			if (directionChangeLocked && e.keyCode != 80 && e.keyCode != 65 && e.keyCode != 72) {
				return
			} else {
				switch (e.keyCode) {
					case 37: // Left arrow is pushed
						if (sa.snake.getDirection() != 'right') {
							sa.snake.setDirection('left');
							directionChangeLocked = true;
						}
						break;
					case 38: // Up arrow is pushed
						if (sa.snake.getDirection() != 'down') {
							sa.snake.setDirection('up');
							directionChangeLocked = true;
						}
						break;
					case 39: // Right arrow is pushed
						if (sa.snake.getDirection() != 'left') {
							sa.snake.setDirection('right');
							directionChangeLocked = true;
						}
						break;
					case 40: // Down arrow is pushed
						if (sa.snake.getDirection() != 'up') {
							sa.snake.setDirection('down');
							directionChangeLocked = true;
						}
						break;
					case 80: // p button
						// If viewHighScoreMode is activated the pause button is disabled
						if (!sa.highScore.viewHighScoreSnakeActivated()) {
							sa.main.togglePause();
						}
						break;
					case 65: // a button
						sa.autoplay.toggleAutoplay();
						break;
					case 72: // h button
						sa.highScore.viewHighScoreSnake();
						break;
				}
			}
		};	
	}

	obj.unlockDirectionChange = function () {
		directionChangeLocked = false;
	}

	obj.lockDirectionChange = function () {
		directionChangeLocked = true;	
	}

	return obj;

})();
(function () {
	// binds a handler to the keydown event to set snake direction
	document.onkeydown = function (e) {
		switch (e.keyCode) {
			case 37: // Left arrow is pushed
				if (sa.snake.getDirection() != 'right') {
					sa.snake.setDirection('left');
				}
				break;
			case 38: // Up arrow is pushed
				if (sa.snake.getDirection() != 'down') {
					sa.snake.setDirection('up');
				}
				break;
			case 39: // Right arrow is pushed
				if (sa.snake.getDirection() != 'left') {
					sa.snake.setDirection('right');
				}
				break;
			case 40: // Down arrow is pushed
				if (sa.snake.getDirection() != 'up') {
					sa.snake.setDirection('down');
				}
				break;
		}
	};
})();
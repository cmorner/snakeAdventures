(function () {
	// binds a handler to the keydown event to set snake direction
	document.onkeydown = function (e) {
		switch (e.keyCode) {
			case 37:
				sa.snake.setDirection('left');
				break;
			case 38:
				sa.snake.setDirection('up');
				break;
			case 39:
				sa.snake.setDirection('right');
				break;
			case 40:
				sa.snake.setDirection('down');
				break;
		}
	};
})();
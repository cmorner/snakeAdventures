// Create a canvas function with closure pattern
// Everything that needs to be drawn is done here
var sa = sa || {};

sa.canvas = (function () {
	var ctx = (function () {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		return ctx;
	})();

	var width = 405;
	var cw = 9; // Cellwidth
	//var nrOfCells: 45;
	var bgSettings = {
		color: '#FFFFFF',
		strokeColor: '#999999'
	};

	var snakeSettings = {
		color: {
			bg: '#000000',
			stroke: '#FFF'
		}
	}

	var foodSettings = {
		color: {
			bg: '#F00'
		}
	}

	var obstaclesSettings = {
		color: {
			bg: '#000000',
			stroke: '#FFF'
		}
	}

	var obj = {};
	
	// can take both a single object and an array
	// Size of the square is based on cell size
	obj.drawSquares = function (coords, bgColor, strokeColor) {
		if (coords instanceof Array) {
			var p;
			for (var i = 0; i < coords.length; i++) {
				p = coords[i]; // Get point with coordinates
				ctx.fillStyle = bgColor;
				ctx.fillRect(p.x*cw, p.y*cw, cw, cw); // At pos x, y width cw (cell width)
				if (strokeColor) { // Only if a strokecolor is specified
					ctx.strokStyle = strokeColor;
					ctx.strokeRect(p.x*cw, p.y*cw, cw, cw);
				}
			}
		}
	}

	obj.drawSnake = function (snakeArray) {
		this.drawSquares(snakeArray, snakeSettings.color.bg, snakeSettings.color.stroke);
	}

	// Size is based on the cellsize
	obj.drawCircle = function (color, point) { // Point is coordinate in the grid
		var center = Math.round(cw/2);
 		ctx.beginPath();
    	ctx.arc(point.x*cw + center, point.y*cw + center, center, 0, 2 * Math.PI, false);
    	ctx.fillStyle = color;
    	ctx.fill();
	}

	obj.drawFood = function (point) {
		this.drawCircle(foodSettings.color.bg, point);
	}

	obj.drawBg = function (color) {
		ctx.fillStyle = bgSettings.color;
		ctx.fillRect(0, 0, width, width);
		ctx.strokeStyle = bgSettings.strokeColor;
		ctx.strokeRect(0, 0, width, width);
		return this;
	}

	obj.drawObstacles = function (obstaclesArray) {
		this.drawSquares(obstaclesArray, obstaclesSettings.color.bg, obstaclesSettings.color.stroke);
	}

	obj.setBgColor = function (color) {
		bgSettings.color = color;
	}

	obj.paintScore = function (score) {
		ctx.font = '20px Helvetica';
		ctx.fillStyle = '#999999'; 
		ctx.fillText(score, 10, 25);
	}

	return obj;
})();


// Test module functionality
(function () {
	var c = sa.canvas;
	
	// drawBg
	c.drawBg().paintScore(10);


	//Draw food
	var foodCoords = {x: 4, y:4};
	c.drawFood(foodCoords);

	// Draw obstacles
	var obstaclesArray = [{x:0, y:10}, {x: 1, y:10}, {x: 2, y:10}, {x: 3, y:10}, {x: 4, y:10}, {x: 4, y:11}, {x: 4, y:12}, {x: 4, y:13}, {x: 4, y:14}, {x: 4, y:15}];
	c.drawObstacles(obstaclesArray);

})();
var settings = {
	interval: 45, // Length in millisec
}

var grid = {};

// Snake class
function Snake () {
	this.array = [];
	this.startLength = 5;
	this.direction = 'right';	
	this.createSnake = function () {
		var array = [];
		for (var i = 0; i < this.startLength; i++) {
			array.push({x: i, y:0});
		}
		this.array = array;
	};
	this.moveSnake = function (direction) {
		var head = this.array[this.array.length-1];
		var headX = head.x;
		var headY = head.y;

		switch (direction) {
			case 'left':
				headX--;
				break;
			case 'up';
				headY--
				break;
			case 'right';
				headX++;
				break;
			case 'down';
				headY++
				break;
		}

		snakeArray.push({x: headX, y: headY});
	}
	
	this.createSnake();
}

var ourSnake;

console.log(ourSnake);

// Game setup

function gameSetup () {
}
ourSnake = new Snake()
canvas.create();

// Game logics

function moveSnake () {}
function createGrid () {}

function createFood () {}
function generateFoodPos () {
	// Find possible food position
}


// Paint scene

canvas.paintBg();
// console.log(ourSnake.array);
canvas.paintSnake(ourSnake.array);

function paintObstacles () {} 
function paintFood () {}

function startInterval () {}


function gameLoop () {
	setInterval(function () {
		console.log('1');
	}, settings.interval);
}

gameSetup();
// gameLoop();

// Controls
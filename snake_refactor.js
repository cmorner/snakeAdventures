var settings = {
	interval: 45, // Length in millisec
}

var canvas = {
	ctx: '',
	width: 405,
	cw: 9, // Cellwidth
	nrOfCells: 45,
	bgColor: '#FFFFFF',
	strokeColor: '#999999',
	create: function () {
		var canvas = document.getElementById('canvas');
		console.log(this);
		this.ctx = canvas.getContext('2d');
	},
	snake: {
		color: '#000000',
		strokeColor: '#FFFFFF'
	},
	paintBg: function () {
		this.ctx.fillStyle = this.bgColor;
		this.ctx.fillRect(0, 0, this.width, this.width);
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.strokeRect(0, 0, this.width, this.width);
	},
	paintSnake: function (array) {
		this.ctx.fillStyle = this.snake.color;
		this.ctx.strokeStyle = this.snake.strokeColor;
		for (var i = 0; i < array.length; i++) {
			var cx = array[i].x;
			var cy = array[i].y;
			this.ctx.fillRect(cx*this.cw, cy*this.cw, this.cw, this.cw);
			this.ctx.strokeRect(cx*this.cw, cy*this.cw, this.cw, this.cw);
		}
	}
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
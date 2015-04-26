var settings = {
	interval: 
	music: {
		source: '',
		active: false;
	}
}

var snake = {
	array: [],
	getLength: function () {
		return this.array.length;
	}
}

var game = {
	score: 0,
	currentFood: {},
	snakeArray: [],
	currentFrame: {},

}

var currentFood;
var musicActivated;
var score;
var snakeArray;
var maze1 = [];
var interval;
var activeInterval;
var direction;
var intervalRate = 45;
var audioElement = document.getElementById('audio');
var directionSet = false;
var gamefieldMatrix = [];
var availableCoords = [];


function gameSetup () {
	musicActivated = false;
	score = 0;
	snakeArray = [];
	maze1 = [];
	gamefieldMatrix = [];
	createSnake();
	createGamefieldMatrix(nrOfCols);
	removeGamefieldMatrixCells();
	audioElement.currentTime = 40;
	audio.pause();
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(paintFrame, intervalRate);
	activeInterval = true;
	direction = 'right';
}

function startSound () {
	audioElement.play();
	musicActivated = true;
}

// Set background of canvas
function paintBackground() {
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, 405, 405);	
	ctx.strokeStyle = '#999999';
	ctx.strokeRect(0, 0, 405, 405);
}

function createSnake () {
	var snakeStartLength = 6;
	var i;
	for (i = 0; i < snakeStartLength; i++) {
		snakeArray.push({x:i, y:0});
	}
}

// function paintSnake () {
// 	var i;
// 	var snakeLength = snakeArray.length;
// 	for (i = 0; i < snakeLength; i++) {
// 		var cx = snakeArray[i].x;
// 		var cy = snakeArray[i].y;
// 		ctx.fillStyle = '#000000';
// 		ctx.fillRect(cx*cs, cy*cs, cs, cs);
// 		ctx.strokeStyle = '#FFFFFF';
// 		ctx.strokeRect(cx*cs, cy*cs, cs, cs);
// 	}
// }


function moveSnake () {
	var snakeLength = snakeArray.length;
	var headcell = snakeArray[snakeLength-1];
	var nx = snakeArray[snakeLength-1].x;
	var ny = snakeArray[snakeLength-1].y;
	var foodX = currentFood.x;
	var foodY = currentFood.y;
	var i;

	directionSet = false;
	if (collisionCheck(nx, ny)) {
		gameSetup();
		return; // if collision exit this function
	}


	var changingFrame = false;
	if (nx > nrOfCols - 1 ) {
			gameSetup();
			return
	}
	if (nx < 0 ) {
		gameSetup();
		return
	}
	if (ny > nrOfCols -1) {
		gameSetup();
		return
	}
	if (ny < 0) {
		gameSetup();
		return;
	} else if (!(foodX == nx && foodY == ny)){
		snakeArray.shift();
	} else {
		score++;
		if (!musicActivated) startSound();
		console.log(snakeArray.length);
		currentFood = '';
	}
	if (!changingFrame) {
		switch (direction) {
		case 'left':
			nx--;
			break;
		case 'up':
			ny--;
			break;
		case 'right':
			nx++;
			break;
		case 'down':
			ny++;
			break;
		}	
	}

	snakeArray.push({x:nx, y:ny})
}

function collisionCheck (nx, ny) {
	var snakeLength = snakeArray.length;
	var maze1Length = maze1.length;
	var i;
	for (i = 0; i < snakeLength - 1; i++) {
		var currentCell = snakeArray[i];
		if (currentCell.x == nx && currentCell.y == ny) {
			return true;
		}
	}
	for (i = 0; i <= maze1Length - 1; i++) {
		var currentCell = maze1[i];
		if (currentCell.x == nx && currentCell.y == ny) {
			return true;
		}
	}
}
function paintScore () {
	ctx.font = '20px Helvetica';
	ctx.fillStyle = '#999999'; 
	ctx.fillText(score, 10, 25);
}

function togglePause () {
	if (activeInterval) {
		clearInterval(interval);
		activeInterval = false;
		audioElement.pause();
	} else {
		interval = setInterval(paintFrame, intervalRate);
		activeInterval = true;
		if (musicActivated) {
			audioElement.play();
		}
	}
}


$(window).keydown(function (e) {
	var oldDirection = direction;
	// game improvement: if player makes fast turn within one frame save movement for next two frame
	switch (e.keyCode) {
		case 37: // left arrow
			if (direction === 'right') break;
			direction = 'left';
			break;
		case 38: // up arrow
			if (direction === 'down') break;
			direction = 'up';
			break;
		case 39: // right arrow
			if (direction === 'left') break;
			direction = 'right';
			break;
		case 40: // down arrow
			e.preventDefault();
			if (direction === 'up') break;
			direction = 'down';
			break;
		case 80: // p button
			togglePause();
			break;
		}
	// Prevents direction to be changed multiple times in a frame
	if (directionSet) direction = oldDirection;
	directionSet = true;
});

// Create a matrix over the whole gamefield
function createGamefieldMatrix (side) {
	for (var i = 0; i < side; i++) {
		for (var n = 0; n < side; n++) {
			gamefieldMatrix.push({x: n, y: i});
		}
	}
}

function removeGamefieldMatrixCells () {
	var indexCorrection = 0;
	for(var i=0; i < maze1.length; i++) {
		var eraseIndex = maze1[i].x + maze1[i].y*nrOfCols - indexCorrection;
		gamefieldMatrix.splice(eraseIndex, 1);
		indexCorrection++ ; // compensating for shifting index in gamefieldMatrix
	}
}

function createFood () {
	var w = canvasWidth/cs;
	var h = canvasHeight/cs;
	var ry;
	var rx;
	if (currentFood) {

		ry = currentFood.y;
		rx = currentFood.x;
	} else {
		var s = gamefieldMatrix.length;
		// Make correct food location work
		var newFoodIndex = Math.floor(Math.random() * s);

		currentFood = gamefieldMatrix[newFoodIndex];
	}
	var centerMove = Math.round(cs/2);
 	ctx.beginPath();
    ctx.arc(rx*cs + centerMove, ry*cs + centerMove, centerMove, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#000000';
    ctx.fill();
}


function paintObstacle () {
	ctx.fillStyle = '#000000';
	for(var i=0; i <= maze1.length - 1; i++)
		ctx.fillRect(maze1[i].x*cs, maze1[i].y*cs, cs, cs);
}


function paintFrame () {
	paintBackground();
	createFood();
	paintSnake();
	paintObstacle();
	moveSnake();
	paintScore();

}

gameSetup();



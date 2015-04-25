var frames = {
	x0y0: {
		mazeCoords: [],
		framechange: {
			left: '',
			up: '',
			right: 'x1y0',
			down: ''
		}
	},
	x1y0: {
		mazeCoords: [],
		framechange: {
			left: 'x0y0',
			up: '',
			right: '',
			down: ''
		}
	}
}

var currentFrame = 'x0y0';

// Generate x0y0 maze
(function () {
	var mazeCoords = [];
	for (var i=20; i <= nrOfCols-1; i++){
		for (var n=0; n <= nrOfCols-1; n++) {
			mazeCoords.push({x:n, y:i});
		}
	}
	frames.x0y0.mazeCoords = mazeCoords;
}());
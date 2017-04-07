var sa = sa || {};



sa.frame = (function () {
	var startFrameId = 'x0y0';
	var currentFrameId = 'x0y0';
	
	var frames = {
		x0y0: {
			obstaclesArray: [{x:0, y:10}, {x: 1, y:10}, {x: 2, y:10}, {x: 3, y:10}, {x: 4, y:10}, {x: 4, y:11}, {x: 4, y:12}, {x: 4, y:13}, {x: 4, y:14}, {x: 4, y:15}],
			framechange: {
				left: '',
				up: '',
				right: 'x1y0',
				down: ''
			}
		},
		x1y0: {
			obstaclesArray: [{x: 43, y:10}, {x: 44, y:10}, {x: 45, y:10}, {x: 43, y:11}],
			framechange: {
				left: 'x0y0',
				up: '',
				right: '',
				down: ''
			}
		}
	};

	var obj = {};

	obj.changeFrame = function (direction) {
		currentFrameId = frames[currentFrameId].framechange[direction]; // Get new frame id
		return this.getCurrentFrame();
	}

	obj.reset = function () {
		currentFrameId = startFrameId;
	}

	obj.setStartFrame = function () {
		currentFrameId = startFrameId;
	}

	obj.getCurrentFrame = function () {
		return frames[currentFrameId];
	}

	return obj;
})();

/*// Generate x0y0 maze
(function () {
	var mazeCoords = [];
	for (var i=20; i <= nrOfCols-1; i++){
		for (var n=0; n <= nrOfCols-1; n++) {
			mazeCoords.push({x:n, y:i});
		}
	}
	frames.x0y0.mazeCoords = mazeCoords;
}());*/
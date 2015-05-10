var sa = sa || {};

sa.frame = (function () {
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
			obstaclesArray: [],
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
		var newFrameId = frames[currentFrameId].direction; // Get new frame id
		var currentFrameId = newFrameId;
		return frames[newFrameId];
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
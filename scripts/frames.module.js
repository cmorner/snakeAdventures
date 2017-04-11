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

	obj.buildFrameX0Y0 = function (dimension) {
		var mazeCoords = [];
		for (var i=0; i < dimension; i++) {
			mazeCoords.push({x: i, y: 0});	
		}
		for (var i=0; i < dimension; i++) {
			mazeCoords.push({x: i, y: 44});	
		}
		for (var i=1; i < dimension-1; i++) {
			mazeCoords.push({x: 0, y: i});	
		}
		for (var i=1; i < dimension-1; i++) {
			mazeCoords.push({x: 44, y: i});	
		}

		// For test purpose
		//mazeCoords.push({x:2, y:1});

		frames.x0y0.obstaclesArray = mazeCoords;
	}

	obj.buildFrameX0Y0(45);

	obj.openDoorX0Y0 = function () {
		frames.x0y0.obstaclesArray.splice(150, 9)
	}

	obj.buildFrameX1Y0 = function (dimension) {
		var mazeCoords = [];
		for (var i=0; i < dimension; i++) {
			mazeCoords.push({x: i, y: 0});	
		}
		for (var i=0; i < dimension; i++) {
			mazeCoords.push({x: i, y: 44});	
		}
		for (var i=1; i < dimension-1; i++) {
			mazeCoords.push({x: 0, y: i});	
		}
		for (var i=1; i < dimension-1; i++) {
			mazeCoords.push({x: 44, y: i});	
		}

		mazeCoords.splice(107, 9);

		frames.x1y0.obstaclesArray = mazeCoords;
	}

	obj.buildFrameX1Y0(45);

	return obj;
})();
var sa = sa || {};

sa.obstacles = (function () {
	var obj = {};

	var obstaclesArray = [{x:0, y:10}, {x: 1, y:10}, {x: 2, y:10}, {x: 3, y:10}, {x: 4, y:10}, {x: 4, y:11}, {x: 4, y:12}, {x: 4, y:13}, {x: 4, y:14}, {x: 4, y:15}];

	obj.getObstacles = function () {
		return obstaclesArray;
	}

	obj.newObstacles = function (newObstacles) {
		obstaclesArray = newObstacles;
	}

	obj.testCollision = function (collision) {
		if (collision) {
			return true;
		} else {
			return false;
		}
	}

	return obj;
})();
var sa = sa || {};

sa.obstacles = (function () {
	var obj = {};

	var obstaclesArray = [];

	obj.getObstacles = function () {
		return obstaclesArray;
	}

	obj.setObstaclesArray = function (newObstaclesArray) {
		obstaclesArray = newObstaclesArray;
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
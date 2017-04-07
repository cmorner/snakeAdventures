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

	// Iterates through obstaclesArray which is an array of coordinate objects
	// and checks them to se if the snake is about to move ontop of one of them
	obj.testCollision = function (newpos) {
		for (var i = 0; i < obstaclesArray.length - 1; i++){
			if (newpos.x == obstaclesArray[i].x && newpos.y == obstaclesArray[i].y){
				return true
			}
		}
		
		return false;
	}

	return obj;
})();
var sa = sa || {};

sa.food = (function () {
	var obj = {};

	var currentFood = {x: 10, y: 10};

	obj.current = function () {
		return currentFood;
	}
	obj.generate = function (posArray) {
		return {x: 0, y: 0}
	}

	obj.hit = function (posObj) {
		if (posObj.x == currentFood.x && posObj.y == currentFood.y) {
			return true;
		} else {
			return false;
		}
	}

	return obj
})();

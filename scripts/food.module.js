var sa = sa || {};

sa.food = (function () {
	var obj = {};

	var currentFood = {x: 10, y: 5};

	obj.current = function () {
		return currentFood;
	}
	// New food is randomized from the current gamefieldMatrix
	obj.generate = function (gamefieldMatrix) {
		
		// This function should randomize a index of the array that represent the array of free 
		// Cells of the gamefield matrix on which the new food should be created

		// Randomize an index based of length of gamefieldMatrix
		var s = gamefieldMatrix.length;
		var newFoodIndex = Math.floor(Math.random() * s);

		// Get food position object from gamefieldMatrix with index
		currentFoodCoordinates = gamefieldMatrix[newFoodIndex];
		
		// Set new current food
		currentFood = currentFoodCoordinates;
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

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
}

Function.method('hej', function () {
	console.log('hej'); 
	return this;}).hej();

//Function.hej();
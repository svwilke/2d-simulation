class Shape {
	
}

Shape.rect = function(pWidth, pHeight) {
	var shape = [];
	shape.push(new Vector(-pWidth/2, -pHeight/2));
	shape.push(new Vector(pWidth/2, -pHeight/2));
	shape.push(new Vector(pWidth/2, pHeight/2));
	shape.push(new Vector(-pWidth/2, pHeight/2));
	return shape;
}

Shape.circle = function(pRadius) {
	var shape = [];
	var steps = Math.max(32, pRadius);
	var i, angleStep = Math.PI * 2 / steps;
	for(i = 0; i < steps; i += 1) {
		var currentAngle = angleStep * i;
		shape.push(new Vector(pRadius * Math.cos(currentAngle), pRadius * Math.sin(currentAngle)));
	}
	return shape;
}

Shape.bezier = function(pStart, pControl1, pControl2, pEnd) {
	var shape = [];
	var step = .01;
	var t;
	for(t = 0; t < 1; t += step) {
		var p1 = pStart.interpolate(pControl1, t);
		var p2 = pControl1.interpolate(pControl2, t);
		var p3 = pControl2.interpolate(pEnd, t);
		var p4 = p1.interpolate(p2, t);
		var p5 = p2.interpolate(p3, t);
		var p6 = p4.interpolate(p5, t);
		shape.push(p6);
	}
	return shape;
}

Shape.bezier = function(pPoints, pStepSize) {
	function interpolate(pPoints, pT) {
		var newPoints = [];
		var i;
		for(i = 0; i < pPoints.length - 1; i += 1) {
			newPoints.push(pPoints[i].interpolate(pPoints[i + 1], pT));
		}
		return newPoints;
	}
	
	var shapePoints = [], addPoints;
	var t;
	for(t = 0; t <= 1; t += pStepSize) {
		addPoints = pPoints;
		while(addPoints.length > 1) {
			addPoints = interpolate(addPoints, t);
		}
		shapePoints.push(addPoints[0]);
	}
	return shapePoints;
}
class Bezier extends GraphNode {
	
	constructor(pStart, pControl1, pControl2, pEnd) {
		super();
		this.mPoints = [];
		this.mPoints.push(pStart);
		this.mPoints.push(pControl1);
		this.mPoints.push(pControl2);
		this.mPoints.push(pEnd);
	}
	
	setPoints(pPoints) {
		this.mPoints = pPoints;
	}
	
	getPoints() {
		return this.mPoints;
	}
	
	setStart(pStart) {
		this.mPoints[0] = pStart;
	}
	
	setControl1(pControl1) {
		this.mPoints[1] = pControl1;
	}
	
	setControl2(pControl2) {
		this.mPoints[2] = pControl2;
	}
	
	setEnd(pEnd) {
		this.mPoints[3] = pEnd;
	}
	
	getStart() {
		return this.mPoints[0];
	}
	
	getControl1() {
		return this.mPoints[1];
	}
	
	getControl2() {
		return this.mPoints[2];
	}
	
	getEnd() {
		return this.mPoints[3];
	}
}
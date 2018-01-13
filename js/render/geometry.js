class Geometry extends GraphNode {
	
	constructor(pPoints) {
		super();
		this.mPoints = pPoints;
		this.mClose = true;
		this.mSkips = [];
	}
	
	setSkips(pSkips) {
		this.mSkips = pSkips;
	}
	
	getSkips() {
		return this.mSkips;
	}
	
	shouldClose() {
		return this.mClose;
	}
	
	setOpen() {
		this.mClose = false;
	}
	
	getPoint(pIndex) {
		return this.mPoints[pIndex];
	}
	
	pointCount() {
		return this.mPoints.length;
	}
}
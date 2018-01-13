class Line {

	constructor(pPoint1, pPoint2) {
		this.mPoint1 = pPoint1;
		this.mPoint2 = pPoint2;
		this.updateLine(new Transform());
	}

	updateLine(pTransform) {
		var matrix = pTransform.getTransform();
		this.mCurrentPoint1 = matrix.multiplyVector(this.mPoint1);
		this.mCurrentPoint2 = matrix.multiplyVector(this.mPoint2);
		this.mLine = this.mCurrentPoint2.subtract(this.mCurrentPoint1).normalize();
		this.mNormal = this.mLine.rotate(-Math.PI / 2);
		this.mLinePos1 = this.mCurrentPoint1.scalarProject(this.mLine);
		this.mLinePos2 = this.mCurrentPoint2.scalarProject(this.mLine);
		this.mNormalPos = this.mCurrentPoint1.scalarProject(this.mNormal);
	}

	overlapCircle(pCenter, pRadius) {
		var normalPos = pCenter.scalarProject(this.mNormal);
		var linePos = pCenter.scalarProject(this.mLine);
		if(Math.abs(normalPos - this.mNormalPos) > pRadius) {
			return false;
		}
		if(this.mLinePos1 < this.mLinePos2) {
			if(linePos < this.mLinePos1) {
				if(pCenter.subtract(this.mCurrentPoint1).magnitudeSq() < pRadius ** 2) {
					return pCenter.subtract(this.mCurrentPoint1).normalize();
				} else {
					return false;
				}
			} else
			if(linePos > this.mLinePos2) {
				if(pCenter.subtract(this.mCurrentPoint2).magnitudeSq() < pRadius ** 2) {
					return pCenter.subtract(this.mCurrentPoint2).normalize();
				} else {
					return false;
				}
			} else {
				return this.mNormal;
			}
		} else {
			if(linePos < this.mLinePos2) {
				if(pCenter.subtract(this.mCurrentPoint2).magnitudeSq() < pRadius ** 2) {
					return pCenter.subtract(this.mCurrentPoint2).normalize();
				} else {
					return false;
				}
			} else
			if(linePos > this.mLinePos1) {
				if(pCenter.subtract(this.mCurrentPoint1).magnitudeSq() < pRadius ** 2) {
					return pCenter.subtract(this.mCurrentPoint1).normalize();
				} else {
					return false;
				}
			} else {
				return this.mNormal;
			}
		}
		return false;
	}

	cross(pOrigin, pDirection) {
		var org = pOrigin.scalarProject(this.mNormal);
		var dst = pOrigin.add(pDirection.multiply(200)).scalarProject(this.mNormal);
		if(org < this.mNormalPos) {
			return dst > this.mNormalPos;
		} else {
			return dst < this.mNormalPos;
		}
	}

	static createLinesFromShape(pShape) {
		var lines = [];
		var i;
		for(i = 0; i < pShape.mPoints.length - 1; i += 1) {
			lines.push(new Line(pShape.mPoints[i], pShape.mPoints[i + 1]));
		}
		if(pShape.shouldClose()) {
			lines.push(new Line(pShape.mPoints[pShape.mPoints.length - 1], pShape.mPoints[0]));
		}
		return lines;
	}
}
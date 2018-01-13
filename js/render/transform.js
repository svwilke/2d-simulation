class Transform extends Group {
	
	constructor() {
		super();
		this.mTranslation = new Vector(0, 0);
		this.mRotation = 0;
		this.mScale = new Vector(1, 1);
	}
	
	getTransform() {
		var transform;
		transform = Matrix.createScale(this.mScale);
		transform = Matrix.createRotation(this.mRotation).multiply(transform);
		transform = Matrix.createTranslation(this.mTranslation).multiply(transform);
		return transform;
	}
	
	setTranslation(pTranslationVector) {
		this.mTranslation = pTranslationVector;
		return this;
	}
	
	getTranslation() {
		return this.mTranslation;
	}
	
	setRotationDeg(pAngleInDegrees) {
		this.mRotation = (pAngleInDegrees / 180) * Math.PI;
		return this;
	}
	
	setRotationRad(pAngleInRadians) {
		this.mRotation = pAngleInRadians;
		return this;
	}
	
	getRotationDeg() {
		return (this.mRotation / Math.PI) * 180;
	}
	
	getRotationRad() {
		return this.mRotation;
	}
	
	setScale(pScaleVector) {
		this.mScale = pScaleVector;
		return this;
	}
	
	getScale() {
		return this.mScale;
	}
}
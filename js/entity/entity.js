class Entity {

	constructor(pTransform = new Transform()) {
		this.mTransform = pTransform;
		this.mDynamic = false;
	}

	getPosition() {
		return this.mTransform.getTranslation();
	}

	setPosition(pVectorPosition) {
		this.mTransform.setTranslation(pVectorPosition);
		this.onChanged();
	}

	setRotation(pRotationInDegrees) {
		this.mTransform.setRotationDeg(pRotationInDegrees);
		this.onChanged();
	}

	rotate(pRotationInDegrees) {
		var oldRot = this.mTransform.getRotationDeg();
		this.mTransform.setRotationDeg((oldRot + pRotationInDegrees + 360) % 360);
		this.onChanged();
	}

	getRotation() {
		return this.mTransform.getRotationDeg();
	}

	setScale(pScaleVector) {
		this.mTransform.setScale(pScaleVector);
		this.onChanged();
	}

	getScale() {
		return this.mTransform.getScale();
	}

	isDynamic() {
		return this.mDynamic;
	}

	onChanged() {

	}

	onSpawn() {

	}

	onDestroy() {

	}

	update() {

	}

	destroy() {
		this.mWorld.removeEntity(this);
	}

	getGraphNode() {
		return this.mTransform;
	}

	toString() {
		return "" + this.mId;
	}

	right() {
		return Vector.right().rotate(this.mTransform.getRotationRad());
	}

	up() {
		return Vector.up().rotate(this.mTransform.getRotationRad());
	}
	
	transformPoint(pLocalPoint) {
		return this.mTransform.getTransform().multiplyVector(pLocalPoint);
	}
}
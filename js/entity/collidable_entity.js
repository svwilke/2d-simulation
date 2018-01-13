class CollidableEntity extends Entity {

	constructor(pTransform = new Transform()) {
		super(pTransform)
		this.mRestitution = 0.81;
		this.mIsSolid = true;
		this.mIsCircle = true;
		this.mRadius = 1;
		this.mActualRadius = 1;
		this.mLines = [];
	}

	setCollisionLines(pLines) {
		this.mLines = pLines;
		this.onChange();
	}

	getCollisionRadius() {
		return this.mActualRadius;
	}

	onChange() {
		this.mActualRadius = this.mRadius * ((this.getScale().getX() + this.getScale().getY()) / 2);

		var i;
		for(i = 0; i < this.mLines.length; i += 1) {
			this.mLines[i].updateLine(this.mTransform);
		}

	}

	onSpawn() {

	}

	onDestroy() {

	}

	update() {

	}

	onCollide(pCollision) {

	}

	checkCollision(pDynamicEntity) {
		var oldCenter = pDynamicEntity.getPosition();
		var center = pDynamicEntity.getNextPosition();
		var radius = pDynamicEntity.getCollisionRadius();
		var moveDelta = pDynamicEntity.mDeltaPosition;

		if(this.mIsCircle) {
			return false;
		}

		var closestNormal = false;
		var closestAngle = Math.PI * 2;
		var i;
		for(i = 0; i < this.mLines.length; i += 1) {
			this.mLines[i].updateLine(this.mTransform);
			var collisionNormal = this.mLines[i].overlapCircle(center, radius);
			if(this.mLines[i].cross(oldCenter, moveDelta)) {
				if(collisionNormal) {
					var angle = collisionNormal.angleBetween(moveDelta);
					if(closestNormal) {
						if(closestAngle > angle) {
							closestAngle = angle;
							closestNormal = collisionNormal;
						}
					} else {
						closestNormal = collisionNormal;
						closestAngle = angle;
					}
				}
			}
		}

		if(closestNormal) {
			return new Collision(this, closestNormal);
		}
	}
}
class Collision {

	constructor(pEntity, pNormal) {
		this.setEntity(pEntity);
		this.setNormal(pNormal);
	}

	setEntity(pEntity) {
		this.mEntity = pEntity;
	}

	setNormal(pNormal) {
		this.mNormal = pNormal;
		this.mTangent = pNormal.rotate(Math.PI / 2);
	}

	getEntity() {
		return this.mEntity;
	}

	getNormal() {
		return this.mNormal;
	}

	getTangent() {
		return this.mTangent;
	}

	copyFor(pEntity) {
		return new Collision(pEntity, this.getNormal());
	}
}
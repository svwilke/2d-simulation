class DynamicEntity extends CollidableEntity {

	constructor(pRadius, pTransform = new Transform()) {
		super(pTransform);
		this.mLDrag = 0.0001;
		//this.mLDrag = 0;
		this.mQDrag = 0.00001;
		//this.mQDrag = 0;
		this.mMass = 1;
		this.mForces = [];
		this.mVelocity = Vector.zero();
		this.mDynamic = true;
		this.mIsCircle = true;
		this.hadCollisionLast = false;
	}

	addForce(pForceVector) {
		this.mForces.push(pForceVector);
	}

	setCell(pNewCell) {
		var oldCell = this.mCell;
		this.mCell = pNewCell;
		return oldCell;
	}

	getCell() {
		return this.mCell;
	}

	onSpawn() {

	}

	onDestroy() {

	}

	update() {
		super.update();

	}

	getNextPosition() {
		if(this.mDeltaPosition) {
			return this.getPosition().add(this.mDeltaPosition);
		} else {
			return this.getPosition();
		}
	}

	calculateMovement() {
		var actingForce = this.accumulateForces().multiply(1 / this.mMass);
		this.mForces = [];
		var drag = this.calculateDrag(this.mVelocity);

		switch(this.mWorld.mIntegrationType) {
			case 'simple':
				var newVelocity = this.mVelocity.add(actingForce);
				newVelocity = newVelocity.add(drag);
				this.mDeltaPosition = this.mVelocity.add(newVelocity).multiply(Time.deltaTime / 2);
				this.mVelocity = newVelocity;
				break;
			case 'forward': case 'eulerstep':
				var newVelocity = this.mVelocity.add(actingForce);
				newVelocity = newVelocity.add(drag);
				this.mVelocity = newVelocity;
				this.mDeltaPosition = this.mVelocity.multiply(Time.deltaTime);
				break;
			/*case 'eulerstep':
				var i;
				var step = 1 / 32;
				for(i = 0; i <= 1; i += step) {
					var newVelocity = this.mVelocity.add(actingForce);
					newVelocity = newVelocity.add(drag);
					this.mVelocity = newVelocity;
					if(i > 0) {
						this.setPosition(this.getPosition().add(this.mDeltaPosition));
					}
					this.mDeltaPosition = this.mVelocity.multiply(Time.deltaTime * step);

					drag = this.calculateDrag(this.mVelocity);
				}
				break;*/
			case 'midpoint':
				var newVelocity = this.mVelocity.add(actingForce);
				newVelocity = newVelocity.add(this.calculateDrag(newVelocity));
				this.mDeltaPosition = this.mVelocity.add(newVelocity).multiply(Time.deltaTime / 2);
				this.mVelocity = newVelocity;
				break;
			case 'rk4':
				var k1v = this.mVelocity;
				var k1dp = this.mVelocity.multiply(Time.deltaTime);
				var k2v = this.mVelocity.add(actingForce);
				k2v = k2v.add(this.calculateDrag(k2v));
				var k2dp = k1dp.multiply(Time.deltaTime / 2);
				break;
			default:
				alert('Error. Unknown integration method: ' + this.mWorld.mIntegrationType);
				break;
		}

		/*
		switch(this.mWorld.mIntegrationType) {
			case 'forward':
				var delta = this.calculateDelta(this.getPosition(), this.mVelocity);
				this.mDeltaPosition = delta[0].multiply(Time.deltaTime);
				this.mDeltaVelocity = delta[1].multiply(Time.deltaTime);
				break;
			default:
				alert('fehler oder so');
				break;
		}
		this.mVelocity = this.mVelocity.add(this.mDeltaVelocity);*/
	}

	calculateDelta(pPosition, pVelocity) {
		var acceleration = this.accumulateForces().add(this.calculateDrag());
		this.mForces = [];
		var deltaVelocity = acceleration.multiply(1 / this.mMass);
		var deltaPosition = deltaVelocity;
		return [deltaPosition, deltaVelocity];
	}

	accumulateForces() {
		var i;
		var accumulatedForce = Vector.zero();
		for(i = 0; i < this.mForces.length; i += 1) {
			accumulatedForce = accumulatedForce.add(this.mForces[i].multiply(Time.deltaTime));
		}
		return accumulatedForce;
	}

	calculateDrag(pVelocity) {
		var dragForce = pVelocity.normalize().multiply(-1);
		var speed = pVelocity.magnitude();
		dragForce = dragForce.multiply(this.mLDrag * speed + this.mQDrag * speed * speed);
		return dragForce;
	}
}
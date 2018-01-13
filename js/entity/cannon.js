class Cannon extends Entity {

	constructor(pSpawnTime, pSize) {
		super(new Transform());

		this.mSpawnTime = pSpawnTime;
		this.mNextSpawn = pSpawnTime;
		this.mSize = pSize;
		this.mTransform.addChild(
			new Rect(pSize * 2, pSize * 4).addChild(
				new Style().setFillStyle('#cccccc').setStrokeStyle('#000000').setLineWidth(2).addChild(
					new Fill().addChild(new Stroke())
				)
			)
		);
	}

	update() {
		this.setRotation(this.getRotation() + Time.deltaTime * 55);
		if(this.mNextSpawn <= 0) {
			var proj = new Projectile(this.mSize);
			proj.addForce(this.transformPoint(Vector.up().multiply(150000)));
			this.mWorld.spawnEntity(
				proj,
				this.transformPoint(
					Vector.up().multiply(
						0.05 + this.mSize * 2
					)
				)
			);
			this.mNextSpawn += this.mSpawnTime;
		}
		this.mNextSpawn = this.mNextSpawn - Time.deltaTime;
	}
}
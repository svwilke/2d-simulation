class Spawner extends Entity {

	constructor(pSpawnTime, pRange) {
		super(new Transform());

		this.mSpawnTime = pSpawnTime;
		this.mNextSpawn = pSpawnTime;
		this.mRange = pRange;
	}

	update() {
		if(this.mNextSpawn <= 0) {
			this.mWorld.spawnEntity(
				new Ball(24),
				this.transformPoint(
					Vector.right().multiply(
						getRandom(-this.mRange, +this.mRange)
					)
				)
			);
			this.mNextSpawn += this.mSpawnTime;
		}
		this.mNextSpawn = this.mNextSpawn - Time.deltaTime;
	}
}
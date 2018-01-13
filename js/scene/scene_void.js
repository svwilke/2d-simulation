class SceneVoid extends Scene {

	constructor() {
		super('BlackHole');
		this.mNextStar = 0.2;
		this.mNextDebris = 1;
	}

	update() {
		this.mNextStar -= Time.deltaTime;
		this.mNextDebris -= Time.deltaTime;
		if(this.mNextStar <= 0) {
			if(getRandom(0, 3) < 1) {
				this.mNextStar -= getRandom(0.5, 2.7);
			} else {
				this.mNextStar += getRandom(0.1, 1.2);
			}

			this.mWorld.spawnEntity(new Star(), new Vector(getRandom(-400, 400), getRandom(-300, 300)));
		}
		if(this.mNextDebris <= 0) {
			this.mNextDebris = 1;
			var distance = 400 + getRandom(-2, 10) * 30;
			this.mWorld.spawnEntity(new Debris(), Vector.up().rotate(Math.random() * Math.PI * 2).multiply(distance));
		}
	}

	onSceneLoad(pWorld) {
		super.onSceneLoad(pWorld);
		pWorld.spawnEntity(new Void(), new Vector(0, 0));
		pWorld.mBackgroundStyle.setFillStyle('#000000');
	}
}
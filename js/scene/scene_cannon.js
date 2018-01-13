class SceneCannon extends Scene {

	constructor() {
		super('CannonShots');
	}

	onSceneLoad(pWorld) {
		super.onSceneLoad(pWorld);

		pWorld.mBackgroundStyle.setFillStyle('#3175e3');
		pWorld.spawnEntity(new Cannon(2, 27), Vector.zero());

		pWorld.spawnEntity(new Obstacle(new Rect(600, 30)), new Vector(0, -500));
		pWorld.spawnEntity(new Obstacle(new Rect(600, 30)), new Vector(0, 500));
		pWorld.spawnEntity(new Obstacle(new Rect(600, 30)), new Vector(500, 0), 90);
		pWorld.spawnEntity(new Obstacle(new Rect(600, 30)), new Vector(-500, 0), 90);

		pWorld.spawnEntity(new Obstacle(new Rect(400, 30)), new Vector(400, -400), 45);
		pWorld.spawnEntity(new Obstacle(new Rect(400, 30)), new Vector(400, 400), 45 + 90);
		pWorld.spawnEntity(new Obstacle(new Rect(400, 30)), new Vector(-400, 400), 45 + 180);
		pWorld.spawnEntity(new Obstacle(new Rect(400, 30)), new Vector(-400, -400), -45);
	}
}
class SceneBalls extends Scene {

	constructor() {
		super('FallingBalls');
	}

	update() {

	}

	onSceneLoad(pWorld) {
		super.onSceneLoad(pWorld);

		pWorld.mBackgroundStyle.setFillStyle('#4286f4');

		pWorld.spawnEntity(new Circstacle(25), new Vector(-350, 270));
		pWorld.spawnEntity(new Circstacle(25), new Vector(350, 270));
		pWorld.spawnEntity(new Obstacle(new Rect(160, 30)), new Vector(180, 100), -45);
		pWorld.spawnEntity(new Obstacle(new Rect(160, 30)), new Vector(-180, 100), 45 + 180);
		pWorld.spawnEntity(new Obstacle(new Rect(80000, 30)), new Vector(0, 285));
		pWorld.spawnEntity(new Obstacle(new Geometry([new Vector(0, -30), new Vector(30, 0), new Vector(-30, 0)])), new Vector(0, 160));
		pWorld.spawnEntity(new Spawner(2.5, 250), new Vector(0, -200));
	}
}
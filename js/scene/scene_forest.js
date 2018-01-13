class SceneForest extends Scene {

	constructor() {
		super('Forest');
	}

	onSceneLoad(pWorld) {
		super.onSceneLoad(pWorld);
		pWorld.spawnEntity(new Deco(new Rect(800, 300), new Color(50, 230, 50)), new Vector(0, 300 - 150));
		var i;
		for(i = 0; i < 3; i += 1) {
			pWorld.spawnEntity(new Tree(), new Vector(getRandom(-200, 200), 300 - 150 + getRandom(-55, 55)));
		}
		var sun = new Sun('#ffff1e');
		pWorld.spawnEntity(sun, new Vector(300, -200));
		sun.setScale(Vector.one().multiply(2));
	}
}
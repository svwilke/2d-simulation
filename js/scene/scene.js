class Scene {

	constructor(pName) {
		this.mName = pName;
	}

	getName() {
		return this.mName;
	}

	update() {

	}

	onSceneLoad(pWorld) {
		document.getElementById("sceneTitle").innerHTML = 'Scene: ' + this.getName();
	}
}
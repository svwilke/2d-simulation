var fixedTime;

function onLoad() {
	Scene.scenes = [new SceneBalls(), new SceneVoid(), new SceneCannon(), new SceneForest()];
	var canvas, ctx, root, scene, renderer, lastTime, fpsCounter, slowUpdateTime, nextSlowUpdate, downPos, isDown;

	function keyDown(e) {

	}

	function mouseWheel(e) {
		World.world.onMouseWheel(e.deltaY < 0 ? -1 : 1);
	}

	function mouseDown(e) {
		downPos = new Vector(e.clientX, e.clientY);
		isDown = true;
	}

	function mouseMove(e) {
		if(isDown) {
			var current = new Vector(e.clientX, e.clientY);
			var delta = current.subtract(downPos);
			downPos = current;
			World.world.onMouseDrag(delta);
		}
	}

	function mouseUp(e) {
		isDown = false;
	}

    function initializeCanvasContext() {
		canvas = document.getElementById('mainCanvas');
		fpsCounter = document.getElementById('fpsCounter');
		if(!canvas) {
			alert('Error on retrieving canvas object');
		}
		ctx = canvas.getContext('2d');
		if(!ctx) {
			alert('Error on retrieving context from canvas');
        }
		ctx.lineJoin = 'round';

		canvas.addEventListener("keydown", keyDown, false);
		canvas.addEventListener("wheel", mouseWheel, false);
		window.addEventListener("mousemove", mouseMove, false);
		canvas.addEventListener("mousedown", mouseDown, false);
		window.addEventListener("mouseup", mouseUp, false);
		canvas.setAttribute("tabindex", 0);
		canvas.focus();

		renderer = new RenderVisitor(ctx);
		lastTime = Date.now();
    }

	function initializeScene() {
		World.world = new World();

		/*ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#e5dcb9';
		ctx.fill();*/

		var defaultStyle = new Style().setFillStyle('#a144a1').setStrokeStyle('#000000').setLineWidth(1).setOpacity(1);
		World.world.mBackgroundStyle = defaultStyle;
		root = new Transform();
		root.setTranslation(new Vector(canvas.width / 2, canvas.height / 2));
		root.addChild(defaultStyle);
		var backgroundRect = new Rect(canvas.width, canvas.height);
		defaultStyle.addChild(backgroundRect);
		var backgroundDraw = new Fill();
		scene = new Transform();
		scene.setScale(new Vector(1, 1));
		backgroundRect.addChild(backgroundDraw.addChild(new Style().setFillStyle('#ffffff').setOpacity(1).addChild(scene)));

		World.world.loadScene(Scene.scenes[0]);
	}

	function update() {
		World.world.update();
		nextSlowUpdate -= Time.deltaTime;
		if(nextSlowUpdate <= 0) {
			nextSlowUpdate += Time.slowUpdateTime;
			fpsCounter.innerHTML = 'FPS: ' + Math.floor(1 / Time.deltaTime);
			World.world.slowUpdate();
		}

	}

    function draw() {
		scene.mChildren = [];
		World.world.constructSceneGraph(scene);
		root.accept(renderer);
	}

	function animationLoop() {
		var time = Date.now();
		var deltaTime = time - lastTime;
		lastTime = time;

		Time.timeInMillis += deltaTime;
		Time.deltaTime = deltaTime / 1000;
		if(fixedTime) {
			Time.deltaTime = 1 / 60;					// Fixed Update Time
		}
		Time.time += Time.deltaTime;

		update();
		draw();
		requestAnimationFrame(animationLoop);
	}

	var i;
	var dropdown = document.getElementById("sceneDropdown");
	for(i = 0; i < Scene.scenes.length; i += 1) {
		dropdown.innerHTML = dropdown.innerHTML + '<option value="' + i + '">' + Scene.scenes[i].getName() + '</option>';
	}

	fixedTime = false;
	Time.time = 0;
	Time.timeInMillis = 0;
	Time.slowUpdateTime = 0.5;
	nextSlowUpdate = Time.slowUpdateTime;

    initializeCanvasContext();
	initializeScene();
	draw();
	animationLoop();
}

function resetSim() {
	World.world.resetScene();
}

function changeScene() {
	var index = parseInt(document.getElementById("sceneDropdown").value);
	World.world.loadScene(Scene.scenes[index]);
}

function togglePause() {
	World.world.mIsPaused = !(World.world.mIsPaused);
	document.getElementById("pauseButton").innerHTML = World.world.mIsPaused ? "Unpause Simulation" : "Pause simulation";
}

function toggleMomentum() {
	World.world.mUseMomentum = !(World.world.mUseMomentum);
}

function toggleFixedTime() {
	fixedTime = !fixedTime;
}

function nextIntegration() {
	var txt = World.world.switchIntegration();
	document.getElementById("integrationDisplay").innerHTML = "Intgr.: " + txt;
}

function getRandom(from, to) {
	var r = (to - from) * Math.random();
	return Math.floor(r + from);
}

function isIn(pX, pIn) {
	var i;
	for(i = 0; i < pIn.length; i += 1) {
		if(pX == pIn[i]) {
			return true;
		}
	}
	return false;
}

window.addEventListener('load', onLoad, false);
class Sun extends Entity {

	constructor(pColor) {
		super(new Transform());
		this.mColor = pColor;
		this.mRayCount = 18;
		this.initializeSceneGraph();
		this.mLifeTime = 0;
		this.mRayDanceAmplitude = 2;
	}

	update() {
		var amp = this.mRayDanceAmplitude;
		this.mLifeTime += Time.deltaTime;
		var value = Math.cos(this.mLifeTime * 10);
		this.mRay.getControl1().setY(value * amp);
		this.mRay.getControl2().setY(-value * amp);
	}

	initializeSceneGraph() {
		var shapeBody;
		var style = new Style().setFillStyle(this.mColor).setStrokeStyle('#000000').setLineWidth(2);
		var styleRay = new Style().setStrokeStyle(this.mColor).setLineWidth(4);
		var rayTranslation = new Transform().setTranslation(new Vector(40, 0));
		var draw;
		var i;

		draw = new Fill();
		draw.addChild(new Stroke());

		shapeBody = new Circle(32);
		//this.mRay = new Geometry([new Vector(0, 12), new Vector(20, 0), new Vector(0, -12)]);
		this.mRay = new Bezier(
			new Vector(0, 0),
			new Vector(7, -12),
			new Vector(14, 12),
			new Vector(21, 0));
		this.mTransform.addChild(style);
		style.addChild(shapeBody);
		shapeBody.addChild(draw);
		for(i = 0; i < this.mRayCount; i += 1) {
			var rotation = new Transform().setRotationDeg((360 / this.mRayCount) * i);
			style.addChild(rotation);
			rotation.addChild(rayTranslation);

		}

		rayTranslation.addChild(styleRay);
		styleRay.addChild(this.mRay);
		this.mRay.addChild(new Stroke());
	}
}
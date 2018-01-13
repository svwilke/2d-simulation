class Debris extends DynamicEntity {

	constructor() {
		super(new Transform());

		var r = getRandom(12, 26);
		this.mRadius = r;
		var shape = new Circle(r);

		this.mStyle = new Style().setFillColor(Color.random()).setLineWidth(2).setStrokeStyle('#ffffff');
		this.mTransform.addChild(shape);
		shape.addChild(this.mStyle);
		this.mStyle.addChild(new Fill().addChild(new Stroke()));
		this.onChange();
		this.mVelocity = new Vector(getRandom(-80, 80), getRandom(-80, 80));
	}

	update() {
		super.update();
		var attraction = this.getPosition().multiply(-1);
		var distance = this.getPosition().magnitudeSq();
		this.addForce(attraction);
	}
}
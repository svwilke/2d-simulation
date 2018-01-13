class Ball extends DynamicEntity {

	constructor(pRadius) {
		super(new Transform());

		this.mRadius = pRadius;

		this.mColorFrom = new Color(getRandom(0, 256), getRandom(0, 256), getRandom(0, 256));
		this.mColorTo = new Color(255, 255, 255);
		this.mMaxSpeed = 200;
		var shape = new Circle(pRadius);
		this.mStyle = new Style().setFillColor(this.mColorFrom).setLineWidth(2).setStrokeStyle('#ab00ab');
		this.mTransform.addChild(shape);
		shape.addChild(this.mStyle);
		this.mStyle.addChild(new Fill().addChild(new Stroke()));
		this.onChange();
	}

	update() {
		super.update();
		this.addForce(new Vector(0, 200));
		var spd = this.mVelocity.magnitude();
		this.mStyle.setFillColor(this.mColorFrom.lerp(this.mColorTo, spd / this.mMaxSpeed));
		if(this.getPosition().getY() > 800 || Math.abs(this.getPosition().getX()) > 350) {
			this.destroy();
		}
	}
}
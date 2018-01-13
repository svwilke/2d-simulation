class Projectile extends DynamicEntity {

	constructor(pRadius) {
		super(new Transform());

		this.mRadius = pRadius;

		var shape = new Circle(pRadius);

		this.mColorFrom = new Color(255, 255, 255);
		this.mColorTo = new Color(0, 0, 0);

		this.mHits = 5;

		this.mStyle = new Style().setFillStyle('#666666');
		this.mTransform.addChild(shape);
		shape.addChild(this.mStyle);
		this.mStyle.addChild(new Fill());
		this.onChange();
	}

	onCollide(pCollision) {
		this.mHits -= 1;
		if(this.mHits < 0) {
			this.destroy();
		} else {
			this.mStyle.setFillColor(this.mColorFrom.lerp(1 - (this.mHits - 1) / 3));
		}
	}
}
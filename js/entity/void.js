class Void extends StaticEntity {

	constructor() {
		super();
		this.mRadius = 30;
		this.mMaxSize = 120;
		this.mStyle = new Style().setFillStyle('#202020').setStrokeStyle('#dd00dd').setLineWidth(3);
		this.mTransform.addChild(this.mStyle);
		this.mStyle.addChild(new Circle(30).addChild(new Fill().addChild(new Stroke())));
	}

	onCollide(pCollision) {
		if(this.mRadius < this.mMaxSize) {
			pCollision.getEntity().destroy();
			this.mRadius += 1.5;
			this.setScale(Vector.one().multiply(this.mRadius / 30));
		}
	}
}
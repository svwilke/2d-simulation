class Circstacle extends StaticEntity {

	constructor(pRadius) {
		super(new Transform());
		this.mIsCircle = true;

		this.mRadius = pRadius;
		this.mShape = new Circle(pRadius);
		this.mStyle = new Style().setStrokeStyle('#000000').setFillStyle('#777777').setLineWidth(1);
		this.mTransform.addChild(this.mShape);
		this.mShape.addChild(this.mStyle);
		this.mStyle.addChild(new Fill().addChild(new Stroke()));
	}
}
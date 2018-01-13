class Obstacle extends StaticEntity {

	constructor(pShape) {
		super(new Transform());
		this.mIsCircle = false;

		this.mShape = pShape;
		this.mStyle = new Style().setStrokeStyle('#000000').setFillStyle('#777777').setLineWidth(1);
		this.mTransform.addChild(this.mShape);
		this.mShape.addChild(this.mStyle);
		this.setCollisionLines(Line.createLinesFromShape(this.mShape));
		this.mStyle.addChild(new Fill().addChild(new Stroke()));
	}
}
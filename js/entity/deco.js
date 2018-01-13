class Deco extends Entity {

	constructor(pShape, pColor) {
		super(new Transform());

		this.mTransform.addChild(
			pShape.addChild(
				new Style().setFillColor(pColor).addChild(
					new Fill()
				)
			)
		);
	}
}
class Star extends Entity {

	constructor() {
		super();

		this.mStyle = new Style().setFillStyle('#ffffff').setOpacity(0.0001);
		this.mTransform.addChild(this.mStyle);
		this.mStyle.addChild(new Circle(4).addChild(new Fill()));
		this.mLifeLength = 3.2;
		this.mLifeTime = 0;
	}

	update() {
		super.update();
		this.mLifeTime += Time.deltaTime;
		if(this.mLifeTime < this.mLifeLength / 2) {
			var value = this.mLifeTime / (this.mLifeLength / 2);
			value = value == 0 ? 0.00001 : value;
			this.mStyle.setOpacity(value);
		} else
		if(this.mLifeTime < this.mLifeLength) {
			this.mStyle.setOpacity(1 - ((this.mLifeTime - this.mLifeLength / 2) / (this.mLifeLength / 2)));
		} else {
			this.destroy();
		}
	}
}
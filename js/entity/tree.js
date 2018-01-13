class Tree extends Entity {

	constructor() {
		super();
		this.mStyle = new Style().setOpacity(0.0001);
		this.mTransform.addChild(this.mStyle);
		this.mAnimation = new Animation('tree-cut', 256, 256, 64, 64, 128, 128);
		this.mStyle.addChild(this.mAnimation);
		this.mLifeTime = 0;
		this.mSpawnTime = 1.5;
		this.mWaitTime = Math.random() * 5;
		this.mAnimationTime = 0.5;
	}

	update() {
		super.update();
		this.mLifeTime += Time.deltaTime;
		if(this.mLifeTime < this.mSpawnTime) {
			this.mStyle.setOpacity(this.mLifeTime / this.mSpawnTime);
		} else {
			this.mStyle.setOpacity(1);
			if(this.mLifeTime > this.mSpawnTime + this.mWaitTime) {
				var frame = this.mAnimation.getFrameCount() * (this.mLifeTime - (this.mSpawnTime + this.mWaitTime)) / this.mAnimationTime;
				if(frame < this.mAnimation.getFrameCount()) {
					this.mAnimation.setFrame(Math.floor(frame));
				} else {
					this.mAnimation.setFrame(this.mAnimation.getFrameCount() - 1);
					var value = (this.mLifeTime - (this.mSpawnTime + this.mWaitTime + this.mAnimationTime));
					if(value <= 1) {
						this.mStyle.setOpacity(1 - value);
					} else {
						this.mStyle.setOpacity(0.00001);
						this.destroy();
					}
				}
			}
		}
	}
}
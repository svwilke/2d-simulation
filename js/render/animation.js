class Animation extends GraphNode {

	constructor(pFileName, pImageWidth, pImageHeight, pFrameWidth, pFrameHeight, pDrawWidth, pDrawHeight) {
		super();
		this.mFrameWidth = pFrameWidth;
		this.mFrameHeight = pFrameHeight;
		this.mFramesX = pImageWidth / pFrameWidth;
		this.mFramesY = pImageHeight / pFrameHeight;
		this.mFrameCount = this.mFramesX * this.mFramesY;
		this.mCurrentFrame = 0;
		this.mSheet = new Image();
		this.mSheet.src = 'images/' + pFileName + '.png';
		this.mDrawWidth = pDrawWidth;
		this.mDrawHeight = pDrawHeight;
	}

	getWidth() {
		return this.mDrawWidth;
	}

	getHeight() {
		return this.mDrawHeight;
	}

	getFrameWidth() {
		return this.mFrameWidth;
	}

	getFrameHeight() {
		return this.mFrameHeight;
	}

	getFrameCount() {
		return this.mFrameCount;
	}

	getX() {
		return this.mFrameWidth * (this.mCurrentFrame % this.mFramesX);
	}

	getY() {
		return this.mFrameHeight * Math.floor(this.mCurrentFrame / this.mFramesX);
	}

	setFrame(pFrameIndex) {
		this.mCurrentFrame = pFrameIndex % this.mFrameCount;
	}

	nextFrame() {
		this.mCurrentFrame = (this.mCurrentFrame + 1) % this.mFrameCount;
	}

	getSheet() {
		return this.mSheet;
	}
}
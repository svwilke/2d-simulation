class Sprite extends GraphNode {

	constructor(pFileName, pWidth, pHeight, pOnLoad = function() {}) {
		super();
		this.mWidth = pWidth;
		this.mHeight = pHeight;
		this.mImage = new Image();
		this.mImage.onload = pOnLoad;
		this.mImage.src = 'images/' + pFileName + '.png';
		this.mIsLoaded = false;
	}
	
	getWidth() {
		return this.mWidth;
	}
	
	getHeight() {
		return this.mHeight;
	}

	isLoaded() {
		return this.mIsLoaded;
	}

	getImage() {
		return this.mImage;
	}
}

Sprite.crackedWall = new Sprite('cracked-wall-diffuse', 512, 512);
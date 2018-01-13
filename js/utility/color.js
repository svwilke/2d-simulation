class Color {

	constructor(pRed, pGreen, pBlue) {
		this.mRed = pRed;
		this.mGreen = pGreen;
		this.mBlue = pBlue;
	}

	setRed(pRed) {
		this.mRed = pRed;
		return this;
	}

	getRed() {
		return this.mRed;
	}

	setGreen(pGreen) {
		this.mGreen = pGreen;
		return this;
	}

	getGreen() {
		return this.mGreen;
	}

	setBlue(pBlue) {
		this.mBlue = pBlue;
		return this;
	}

	getBlue() {
		return this.mBlue;
	}

	lerp(pTarget, pTime) {
		pTime = pTime < 0 ? 0 : pTime > 1 ? 1 : pTime;
		var dr = pTarget.mRed - this.mRed;
		var dg = pTarget.mGreen - this.mGreen;
		var db = pTarget.mBlue - this.mBlue;
		return new Color(this.mRed + (dr * pTime), this.mGreen + (dg * pTime), this.mBlue + (db * pTime));
	}

	toString() {
		return '#' + toHex(this.mRed) + toHex(this.mGreen) + toHex(this.mBlue);
	}

	static random() {
		return new Color(getRandom(0, 256), getRandom(0, 256), getRandom(0, 256));
	}

}

function toHex(pDecimal) {
	return ("0" + Number(Math.round(pDecimal)).toString(16)).slice(-2);
}
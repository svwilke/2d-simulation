class Style extends Group {
	
	merge(pParentNode) {
		var newNode = new Style();
		newNode.setFillStyle(this.mFillStyle ? this.mFillStyle : pParentNode.mFillStyle);
		newNode.setStrokeStyle(this.mStrokeStyle ? this.mStrokeStyle : pParentNode.mStrokeStyle);
		newNode.setLineWidth(this.mLineWidth ? this.mLineWidth : pParentNode.mLineWidth);
		newNode.setOpacity(this.mOpacity ? this.mOpacity : pParentNode.mOpacity);
		return newNode;
	}
	
	apply(pContext) {
		pContext.fillStyle = this.mFillStyle;
		pContext.strokeStyle = this.mStrokeStyle;
		pContext.lineWidth = this.mLineWidth;
		pContext.globalAlpha = this.mOpacity;
	}
	
	setFillStyle(pFillStyle) {
		this.mFillStyle = pFillStyle;
		return this;
	}
	
	setStrokeStyle(pStrokeStyle) {
		this.mStrokeStyle = pStrokeStyle;
		return this;
	}
	
	setFillColor(pFillColor) {
		return this.setFillStyle(pFillColor.toString());
	}
	
	setStrokeColor(pStrokeColor) {
		return this.setStrokeStyle(pStrokeColor.toString());
	}
	
	setLineWidth(pLineWidth) {
		this.mLineWidth = pLineWidth;
		return this;
	}
	
	setOpacity(pOpacity) {
		this.mOpacity = pOpacity;
		return this;
	}
	
	displayString() {
		return 	'FillStyle: ' + this.mFillStyle + '\n'
			+	'StrokeStyle: ' + this.mStrokeStyle + '\n'
			+	'LineWidth: ' + this.mLineWidth + '\n'
			+	'GlobalAlpha: ' + this.mOpacity;
	}
}
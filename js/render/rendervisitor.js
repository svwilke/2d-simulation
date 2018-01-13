class RenderVisitor {

	constructor(pContext) {
		this.mContext = pContext;
		this.mTransformStack = [];
		this.mStyleStack = [];
	}

	visit(pNode) {
		if(pNode.constructor.name == 'Group') {
			this.visitGroup(pNode);
		} else
		if(pNode.constructor.name == 'Transform') {
			this.visitTransform(pNode);
		} else
		if(pNode.constructor.name == 'Sprite') {
			this.visitSprite(pNode);
		} else
		if(pNode.constructor.name == 'Bezier') {
			this.visitBezier(pNode);
		} else
		if(pNode.constructor.name == 'Animation') {
			this.visitAnimation(pNode);
		} else
		if(pNode instanceof Geometry) {
			this.visitGeometry(pNode);
		} else
		if(pNode.constructor.name == 'Style') {
			this.visitStyle(pNode);
		}
		if(pNode.constructor.name == 'Stroke') {
			this.visitStroke(pNode);
		} else
		if(pNode.constructor.name == 'Fill') {
			this.visitFill(pNode);
		}
	}

	// --- REGION: Visit Functions --- //

	visitGroup(pNode) {
		var index, child;
		for(index = 0; index < pNode.childCount(); index += 1) {
			child = pNode.getChild(index);
			child.accept(this);
		}
	}

	visitTransform(pNode) {
		this.pushTransform(pNode.getTransform());
		this.visitGroup(pNode);
		this.popTransform();
	}

	visitGeometry(pNode) {
		this.peekTransform().setTransform(this.mContext);
		var i, point;
		this.mContext.beginPath();
		for(i = 0; i < pNode.pointCount(); i += 1) {
			var point = pNode.getPoint(i);
			if(i == 0 || isIn(i, pNode.getSkips())) {
				this.mContext.moveTo(point.getX(), point.getY());
			} else {
				this.mContext.lineTo(point.getX(), point.getY());
			}
		}
		if(pNode.shouldClose()) {
			this.mContext.closePath();
		}
		this.visitGroup(pNode);
	}

	visitBezier(pNode) {
		this.peekTransform().setTransform(this.mContext);
		var bezierPoints = Shape.bezier(pNode.getPoints(), 0.01);
		var i, point;
		this.mContext.beginPath();
		for(i = 0; i < bezierPoints.length; i += 1) {
			var point = bezierPoints[i];
			if(i == 0) {
				this.mContext.moveTo(point.getX(), point.getY());
			} else {
				this.mContext.lineTo(point.getX(), point.getY());
			}
		}
		this.visitGroup(pNode);
	}

	visitSprite(pNode) {
		this.peekStyle().apply(this.mContext);
		this.peekTransform().setTransform(this.mContext);
		var image = pNode.getImage();
		this.mContext.drawImage(image, -pNode.getWidth()/2, -pNode.getHeight()/2, pNode.getWidth(), pNode.getHeight());
		this.visitGroup(pNode);
	}

	visitAnimation(pNode) {
		this.peekStyle().apply(this.mContext);
		this.peekTransform().setTransform(this.mContext);
		var image = pNode.getSheet();
		this.mContext.drawImage(image, pNode.getX(), pNode.getY(), pNode.getFrameWidth(), pNode.getFrameHeight(), -pNode.getWidth()/2, -pNode.getHeight()/2, pNode.getWidth(), pNode.getHeight());
		this.visitGroup(pNode);
	}

	visitStyle(pNode) {
		this.pushStyle(pNode);
		this.visitGroup(pNode);
		this.popStyle();
	}

	visitStroke(pNode) {
		this.peekStyle().apply(this.mContext);
		this.mContext.stroke();
		this.visitGroup(pNode);
	}

	visitFill(pNode) {
		this.peekStyle().apply(this.mContext);
		this.mContext.closePath();
		this.mContext.fill();
		this.visitGroup(pNode);
	}

	// --- REGION: Stack Functions --- //

	pushTransform(pTransform) {
		if(this.mTransformStack.length == 0) {
			this.mTransformStack.push(pTransform);
		} else {
			this.mTransformStack.push(this.peekTransform().multiply(pTransform));
		}
	}

	popTransform() {
		this.mTransformStack.pop();
	}

	peekTransform() {
		return this.mTransformStack[this.mTransformStack.length - 1];
	}

	pushStyle(pStyleNode) {
		if(this.mStyleStack.length == 0) {
			this.mStyleStack.push(pStyleNode);
		} else {
			this.mStyleStack.push(pStyleNode.merge(this.peekStyle()));
		}
	}

	popStyle() {
		this.mStyleStack.pop();
	}

	peekStyle() {
		return this.mStyleStack[this.mStyleStack.length - 1];
	}
}
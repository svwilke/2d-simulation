class GraphNode {

	constructor() {
		this.mChildren = [];
	}

	addChild(pChild) {
		this.mChildren.push(pChild);
		return this;
	}

	childCount() {
		return this.mChildren.length;
	}

	getChild(pIndex) {
		return this.mChildren[pIndex];
	}

	accept(visitor) {
		visitor.visit(this);
	}
}
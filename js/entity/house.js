class House {
    constructor(pPosition, pRotation, pScale) {
		this.mSceneGraph = new Transform();
		this.mSceneGraph.setTranslation(pPosition);
		this.mSceneGraph.setRotationDeg(pRotation);
		this.mSceneGraph.setScale(pScale);
		this.initializeSceneGraph();
	}
	
	getGraphNode() {
		return this.mSceneGraph;
	}
	
	initializeSceneGraph() {
		var styleHouse, styleWalls, styleDoor, styleWindow, styleRoof;
		var transformDoor, transformWindow, transformRoof, transformBody;
		var shapeWalls, shapeDoor, shapeWindow, shapeRoof;
		var draw;
		
		draw = new Fill();
		draw.addChild(new Stroke());
		
		transformBody = new Transform();
		transformBody.setTranslation(new Vector(0, 0));
		
		transformDoor = new Transform();
		transformDoor.setTranslation(new Vector(-40, 10));
		
		transformWindow = new Transform();
		transformWindow.setTranslation(new Vector(22, 5));
		
		transformRoof = new Transform();
		transformRoof.setTranslation(new Vector(-70, -40));
		
		styleHouse = new Style().setLineWidth(3).setStrokeStyle('#282b2a').setOpacity(1);
		styleWalls = new Style().setFillStyle('#7f6749');
		styleDoor = new Style().setFillStyle('#9a9b82');
		styleWindow = new Style().setFillStyle('#c6d850').setLineWidth(2);
		styleRoof = new Style().setFillStyle('#3b5148');
		
		shapeWalls = new Rect(140, 80);
		shapeDoor = new Rect(30, 60);
		shapeWindow = new Rect(70, 30);
		shapeRoof = new Geometry([new Vector(0, 0), new Vector(70, -40), new Vector(140, 0)]);
		
		this.mSceneGraph.addChild(styleHouse);
			styleHouse.addChild(transformRoof);
				transformRoof.addChild(styleRoof);
					styleRoof.addChild(shapeRoof);
						shapeRoof.addChild(draw);
			styleHouse.addChild(transformBody);
				transformBody.addChild(styleWalls);
					styleWalls.addChild(shapeWalls);
						shapeWalls.addChild(draw);
				transformBody.addChild(transformDoor);
					transformDoor.addChild(styleDoor);
						styleDoor.addChild(shapeDoor);
							shapeDoor.addChild(draw);
				transformBody.addChild(transformWindow);
					transformWindow.addChild(styleWindow);
						styleWindow.addChild(shapeWindow);
							shapeWindow.addChild(draw);
	}
}
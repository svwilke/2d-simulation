class World {

	constructor() {

		this.mIntegrationList = ['simple', 'forward', 'midpoint'];
		this.mIntegrationTitles = ['Simple', 'Forward Euler', 'Implicit Midpoint'];
		this.mIntegrationType = 'simple';

		this.mIsPaused = false;
		this.mCollisionChecks = 0;
		this.mCollisionCount = 0;
		this.mDynamicCount = 0;
		this.mStaticCount = 0;
		this.mOtherCount = 0;

		this.mUseMomentum = false;
		this.mMomentumConservation = 0.4;
	}

	switchIntegration() {
		var index = (this.mIntegrationList.indexOf(this.mIntegrationType) + 1) % this.mIntegrationList.length;
		this.mIntegrationType = this.mIntegrationList[index];
		return this.mIntegrationTitles[index];
	}

	loadScene(pScene) {
		// Reset Entities
		this.mEntities = {};
		this.mDestroyQueue = [];
		this.mCellSize = 40;
		this.mCells = {};
		this.mNextEntityId = 100;
		this.mStaticEntities = [];

		// Reset Camera
		this.mWorldPan = new Transform();
		this.mWorldZoom = new Transform();
		this.mWorldRoot = new Transform();
		this.mWorldZoom.addChild(this.mWorldPan);
		this.mWorldPan.addChild(this.mWorldRoot);

		// Load Scene
		this.mActiveScene = pScene;
		pScene.onSceneLoad(this);
		pScene.mWorld = this;
	}

	resetScene() {
		if(this.mActiveScene) {
			this.loadScene(this.mActiveScene);
		}
	}

	spawnEntity(pEntity, pPosition, pRotation) {
		pEntity.mId = this.mNextEntityId;
		pEntity.mWorld = this;
		this.mNextEntityId += 1;
		this.mEntities[pEntity] = pEntity;
		pEntity.setPosition(pPosition);
		if(pEntity instanceof DynamicEntity) {
			pEntity.setCell(this.getCellId(pPosition));
			this.getCellById(pEntity.getCell()).push(pEntity);
		} else
		if(pEntity instanceof StaticEntity) {
			this.mStaticEntities.push(pEntity);
		}
		if(!(pRotation===undefined)) {
			pEntity.setRotation(pRotation);
		}
		pEntity.onSpawn();
	}

	getCell(pPosition) {
		var cid = getCellId(pPosition);
		return getCellById(cid);
	}

	getCellById(pCellId) {
		if(pCellId in this.mCells) {
			return this.mCells[pCellId];
		} else {
			this.mCells[pCellId] = [];
			return this.mCells[pCellId];
		}
		return undefined;
	}

	getCellId(pPosition) {
		var x = Math.floor(pPosition.getX() / this.mCellSize);
		var y = Math.floor(pPosition.getY() / this.mCellSize);
		return x + "," + y;
	}

	getCellAndNeighbors(pPosition) {
		var x = Math.floor(pPosition.getX() / this.mCellSize);
		var y = Math.floor(pPosition.getY() / this.mCellSize);
		var dx, dy;
		var cellList = [];
		for(dx = -1; dx <= 1; dx += 1) {
			for(dy = -1; dy <= 1; dy += 1) {
				var str = (x + dx) + "," + (y + dy);
				if(str in this.mCells) {
					cellList.push(this.mCells[str]);
				}
			}
		}
		return cellList;
	}

	getAllNearbyEntities(pPosition) {
		var cells = this.getCellAndNeighbors(pPosition);
		var i;
		var entities = [];
		for(i = 0; i < cells.length; i += 1) {
			entities = entities.concat(cells[i]);
		}
		return entities;
	}

	removeFromCell(pDynamicEntity, pCellId) {
		var cell = this.getCellById(pCellId);
		cell.splice(cell.indexOf(pDynamicEntity), 1);
	}

	removeEntity(pEntity) {
		this.mDestroyQueue.push(pEntity);
	}

	update() {
		var i, key, entity;

		if(this.mIsPaused) {
			return;
		}

		if(this.mActiveScene) {
			this.mActiveScene.update();
		}

		this.mCollisionChecks = 0;
		this.mCollisionCount = 0;
		this.mDynamicCount = 0;
		this.mStaticCount = 0;
		this.mOtherCount = 0;

		// Update entities
		for(key in this.mEntities) {
			entity = this.mEntities[key];
			if(entity instanceof DynamicEntity) {
				this.mDynamicCount += 1;
				entity.calculateMovement();
				this.handleCollision(entity, this.getAllNearbyEntities(entity.getNextPosition()).concat(this.mStaticEntities));
			} else
			if(entity instanceof StaticEntity) {
				this.mStaticCount += 1;
			} else {
				this.mOtherCount += 1;
			}

			entity.update();

			if(entity instanceof DynamicEntity) {
				entity.setPosition(entity.getPosition().add(entity.mDeltaPosition));
				var newCell = this.getCellId(entity.getPosition());
				var oldCell = entity.setCell(newCell);
				if(oldCell != newCell) {
					this.removeFromCell(entity, oldCell);
					this.getCellById(newCell).push(entity);
				}
			}
		}

		// Destroy destroyed entities. :)
		for(i = 0; i < this.mDestroyQueue.length; i += 1) {
			this.mDestroyQueue[i].onDestroy();
			if(this.mDestroyQueue[i] instanceof DynamicEntity) {
				this.removeFromCell(this.mDestroyQueue[i], this.mDestroyQueue[i].getCell());
			} else
			if(this.mDestroyQueue[i] instanceof StaticEntity) {
				this.mStaticEntities.splice(this.mStaticEntities.indexOf(this.mDestroyQueue[i]), 1);
			}
			delete this.mEntities[this.mDestroyQueue[i]];
		}
		this.mDestroyQueue = [];

		document.getElementById("entityInfo").innerHTML = 'Entities: ' + this.mOtherCount + ', ' + this.mStaticCount + ', ' + this.mDynamicCount;
		document.getElementById("collisionInfo").innerHTML = 'Collisions: ' + this.mCollisionCount + " / " + this.mCollisionChecks;
	}

	slowUpdate() {

	}

	handleCollision(pEntity, pEntities) {
		var key, i;
		var collisions = [1];
		var emergencyCutoff = 1;
		var loopCount = 0;
		// Collision Detection
		//while(loopCount < emergencyCutoff && collisions.length > 0) {
			loopCount += 1;
			collisions = [];
			this.mCollisionChecks += pEntities.length - 1;
			for(i = 0; i < pEntities.length; i += 1) {
				var collidingEntity = pEntities[i];
				if(key != pEntity.toString()) {
					var collision;
					if(collidingEntity instanceof StaticEntity) {
						if(!collidingEntity.mIsCircle) {
							collision = collidingEntity.checkCollision(pEntity);
							if(collision) {
								collisions.push(collision);
							}
						} else {
							var fromTo = pEntity.getNextPosition().subtract(collidingEntity.getPosition());
							if(fromTo.magnitude() <= collidingEntity.mRadius + pEntity.mRadius) {
								collision = new Collision(collidingEntity, fromTo);
								collisions.push(collision);
							}
						}
					} else
					if(collidingEntity instanceof DynamicEntity) {
						var fromTo = pEntity.getPosition().subtract(collidingEntity.getPosition());
						var overlap = collidingEntity.getCollisionRadius() + pEntity.getCollisionRadius() - fromTo.magnitude();
						var pointOfOverlap = collidingEntity.getPosition().add(fromTo.withLength(pEntity.getCollisionRadius())).add(fromTo.withLength(-overlap / 2));
						var normProjectOverlap = pointOfOverlap.scalarProject(fromTo);
						var normProjectPos = pEntity.getPosition().scalarProject(fromTo);
						var normProjectVel = pEntity.getPosition().add(pEntity.mVelocity.multiply(2000)).scalarProject(fromTo);
						if(overlap > 0) {
							if(normProjectPos < normProjectOverlap) {
								if(normProjectVel > normProjectOverlap) {
									collision = new Collision(collidingEntity, fromTo);
									collisions.push(collision);
								}
							} else {
								if(normProjectVel < normProjectOverlap) {
									collision = new Collision(collidingEntity, fromTo);
									collisions.push(collision);
								}
							}
						}
					}
				}
			}


			this.mCollisionCount += collisions.length;
			// Collision Response

			var accumulatedCollisionVelocity = Vector.zero();
			var accumulatedLinePart = Vector.zero();
			for(i = 0; i < collisions.length; i += 1) {
			//if(collisions.length > 0) {
				collision = collisions[i];
				var normalPart = pEntity.mVelocity.project(collision.getNormal());
				var linePart = pEntity.mVelocity.project(collision.getTangent());
				var restitution = (pEntity.mRestitution * collision.getEntity().mRestitution);
				normalPart = normalPart.multiply(-restitution);

				accumulatedCollisionVelocity = accumulatedCollisionVelocity.add(normalPart);
				accumulatedLinePart = accumulatedLinePart.add(linePart);
				//pEntity.mVelocity = normalPart.add(linePart);
				//pEntity.mDeltaPosition = pEntity.mVelocity.multiply(Time.deltaTime);
				//pEntity.mDeltaPosition = pEntity.mDeltaPosition.multiply(restitution);
				//pEntity.mDeltaPosition = pEntity.mDeltaPosition.project(linePart).multiply(restitution);

				if(this.mUseMomentum && collision.getEntity() instanceof DynamicEntity) {
					var oMass = collision.getEntity().mMass;
					var tMass = pEntity.mMass;
					var c1 = pEntity.mVelocity.multiply((tMass - oMass) / (tMass + oMass));
					var c2 = collision.getEntity().mVelocity.multiply((2 * oMass) / (tMass + oMass));
					pEntity.addForce(c1.add(c2).multiply(this.mMomentumConservation / Time.deltaTime));
				}

				collision.getEntity().onCollide(collision.copyFor(pEntity));
				if(collision.getEntity() instanceof StaticEntity) {
					pEntity.onCollide(collision);
				}

			}
			if(collisions.length > 0) {
				pEntity.mVelocity = accumulatedLinePart.multiply(1 / collisions.length).add(accumulatedCollisionVelocity);
				//pEntity.mVelocity = accumulatedLinePart.add(accumulatedCollisionVelocity);
				pEntity.mDeltaPosition = pEntity.mVelocity.multiply(Time.deltaTime);
				//pEntity.mDeltaPosition = Vector.zero();
			}
		//}
		//if(collisions.length > 1) {
			//pEntity.mVelocity = accumulatedCollisionVelocity.multiply(1 / collisions.length);
			//pEntity.mDeltaPosition = pEntity.mVelocity.multiply(Time.deltaTime);
			//pEntity.mDeltaPosition = Vector.zero();
		//}
		pEntity.hadCollisionLast = collisions.length > 0;
	}

	handleDynamicCollision(pEntity) {
		var key, i;
		var collisions = [];
		for(key in this.mEntities) {
			var collidingEntity = this.mEntities[key];
			if(key != pEntity.toString()) {

			}
		}
		var collision;
		for(i = 0; i < collisions.length; i += 1) {
			collision = collisions[i];
			var normalPart = pEntity.mVelocity.project(collision.getNormal());
			var linePart = pEntity.mVelocity.project(collision.getTangent());
			var restitution = (pEntity.mRestitution * collision.getEntity().mRestitution);
			normalPart = normalPart.multiply(-restitution);
			pEntity.mVelocity = normalPart.add(linePart);
		}
	}

	onMouseWheel(pMouseDelta) {
		var scale = this.mWorldZoom.getScale();
		var change = 1.5;
		change = pMouseDelta > 0 ? 1 / change : change;
		var nsc = scale.multiply(change);
		/*if(nsc.magnitudeSq() == 0) {
			return;
		}*/
		this.mWorldZoom.setScale(nsc);
	}

	onMouseDrag(pDelta) {
		var sens = 1 / this.mWorldZoom.getScale().getX();
		var change = pDelta.multiply(sens);
		this.mWorldPan.setTranslation(this.mWorldPan.getTranslation().add(change));
	}

	constructSceneGraph(pRootNode) {
		var key;
		var style = new Style().setStrokeStyle('#12cc12').setLineWidth(2);
		style.addChild(new Stroke());

		pRootNode.addChild(this.mWorldZoom);
		this.mWorldRoot.mChildren = [];

		for(key in this.mEntities) {
			this.mWorldRoot.addChild(this.mEntities[key].getGraphNode());
			/*
			if(this.mEntities[key] instanceof Obstacle) {
				var lines = this.mEntities[key].mLines;
				var i;
				for(i = 0; i < lines.length; i += 1) {
					console.log(lines.mPoint1);
					var shape = new Geometry([lines.mCurrentPoint1, lines.mCurrentPoint2]);
					shape.setOpen();
					shape.addChild(style);
					pRootNode.addChild(shape);
				}
			}
			*/
		}
	}
}
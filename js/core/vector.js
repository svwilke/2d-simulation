class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ ? pZ : 1);
    }

    getX() {
        return this.mX;
    }

    setX(pX) {
        this.mX = pX;
    }

    getY() {
        return this.mY;
    }

    setY(pY) {
        this.mY = pY;
    }

    getZ() {
        return this.mZ;
    }

    setZ(pZ) {
        this.mZ = pZ;
    }

	copy() {
		return new Vector(
			this.getX(),
			this.getY(),
			this.getZ());
	}

	add(vector) {
		return new Vector(
			this.getX() + vector.getX(),
			this.getY() + vector.getY());
	}

	subtract(vector) {
		return new Vector(
			this.getX() - vector.getX(),
			this.getY() - vector.getY());
	}

	multiply(scalar) {
		return new Vector(
			this.getX() * scalar,
			this.getY() * scalar);
	}

	divide(scalar) {
		return new Vector(
			this.getX() / scalar,
			this.getY() / scalar);
	}

	magnitude() {
		return Math.sqrt(this.magnitudeSq());
	}

	magnitudeSq() {
		return this.getX() ** 2 + this.getY() ** 2;
	}

	normalise() {
		var mag = this.magnitude();
		if(mag == 0) {
			return this.copy();
		}
		return this.divide(mag);
	}

	normalize() {
		return this.normalise();
	}

	withLength(pLength) {
		return this.normalize().multiply(pLength);
	}

	limitTo(scalar) {
		var m = this.magnitude();
		if(m > scalar) {
			return this.divide(m).multiply(scalar);
		} else {
			return this.copy();
		}
	}

	dotProduct(vector) {
		return this.getX() * vector.getX()
			 + this.getY() * vector.getY();
	}

	interpolate(vector, scalar) {
		return this.multiply(1 - scalar).add(vector.multiply(scalar));
	}

	rotate(radians) {
		return new Vector(
			this.getX() * Math.cos(radians) - this.getY() * Math.sin(radians),
			this.getX() * Math.sin(radians) + this.getY() * Math.cos(radians));
	}

	angleBetween(vector) {
		return Math.acos(this.dotProduct(vector) / (this.magnitude() * vector.magnitude()));
	}

	project(vector) {
		var scalarProjection = this.scalarProject(vector);
		return vector.normalize().multiply(scalarProjection);
	}

	scalarProject(vector) {
		return this.dotProduct(vector.normalize());
	}

	static zero() {
		return new Vector(0, 0);
	}

	static right() {
		return new Vector(1, 0);
	}

	static up() {
		return new Vector(0, -1);
	}

	static down() {
		return new Vector(0, 1);
	}

	static left() {
		return new Vector(-1, 0);
	}

	static one() {
		return new Vector(1, 1);
	}

	toString() {
		return 'Vector(' + this.getX() + ', ' + this.getY() + ')';
	}
}
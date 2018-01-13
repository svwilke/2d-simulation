class Matrix {

	constructor(xx, xy, xz, yx, yy, yz, zx, zy, zz) {
		this.mValues = [[xx, xy, xz], [yx, yy, yz], [zx, zy, zz]];
	}

	getElement(pRow, pColumn) {
		return this.mValues[pRow][pColumn];
	}
	
	multiply(matrix) {
		var i, j, k;
		var r = [[], [], []];
		for(i = 0; i < 3; i += 1) {
			for(j = 0; j < 3; j += 1) {
				var sum = 0;
				for(k = 0; k < 3; k += 1) {
					sum += this.getElement(i, k) * matrix.getElement(k, j);
				}
				r[i][j] = sum;
			}
		}
		return new Matrix(r[0][0], r[0][1], r[0][2], r[1][0], r[1][1], r[1][2], r[2][0], r[2][1], r[2][2]);
	}
	
	multiplyVector(vector) {
		var i, j;
		return new Vector(
			this.getElement(0, 0) * vector.getX() + this.getElement(0, 1) * vector.getY() + this.getElement(0, 2) * vector.getZ(),
			this.getElement(1, 0) * vector.getX() + this.getElement(1, 1) * vector.getY() + this.getElement(1, 2) * vector.getZ(),
			this.getElement(2, 0) * vector.getX() + this.getElement(2, 1) * vector.getY() + this.getElement(2, 2) * vector.getZ());
	}
	
	setTransform(context) {
		context.setTransform(	this.getElement(0, 0), this.getElement(1, 0), this.getElement(0, 1),
								this.getElement(1, 1), this.getElement(0, 2), this.getElement(1, 2));
	}
	
	transform(context) {
		context.transform(	this.getElement(0, 0), this.getElement(1, 0), this.getElement(0, 1),
							this.getElement(1, 1), this.getElement(0, 2), this.getElement(1, 2));
	}
	
	static createIdentity() {
		return new Matrix(	1, 0, 0,
							0, 1, 0,
							0, 0, 1);
	}
	
	static createTranslation(vector) {
		return new Matrix(	1, 0, vector.getX(),
						0, 1, vector.getY(),
						0, 0, 1);
	}
	
	static createScale(vector) {
		return new Matrix( 	vector.getX(), 0, 0,
							0, vector.getY(), 0,
							0, 0, 1);
	}
	
	static createRotation(angleInRadians) {
		return new Matrix( 	Math.cos(angleInRadians), -Math.sin(angleInRadians), 0,
							Math.sin(angleInRadians), Math.cos(angleInRadians), 0,
							0, 0, 1);
	}
}
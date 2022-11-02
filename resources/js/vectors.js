class vect2d{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	diff(o){
		return new vect2d(this.x - o.x, this.y - o.y);
	}

	rmult(v){
		return new vect2d(this.x * v, this.y * v);
	}




	add(o){
		this.x += o.x;
		this.y += o.y;
	}

	sub(o){
		this.x -= o.x;
		this.y -= o.y;
	}

	mult(v){
		this.x *= v;
		this.y *= v;
	}

	div(v){
		if (v != 0){
			this.mult(1/v);
		}
	}



	dist(o){
		return this.diff(o).norm();
	}

	norm(){
		return (this.x**2 + this.y**2)**0.5;
	}

	normalize(){
		this.div(this.norm());
	}

	setMag(v){
		this.normalize();
		this.mult(v);
	}

	limit(v){
		var n = this.norm();
		if(n > v){
			this.div(n);
			this.mult(v)
		}
	}
}
class Ship{
	constructor(inp){
		//Init vars
		this.pos = inp;
		this.vel = new vect2d(0.5, 0.5);

		//Settings
		this.perceptionRadius = 1000;
		this.minDistanceBtw = 10;
		this.steerForce = 0.5;
	}

	render(context){
		context.beginPath();
		context.rect(this.pos.x - 10, this.pos.y - 10, 20, 20);
		context.stroke();
	}

	update(dt, sw, sh, flock){
		///Calculate acceleration
		var acc = this.behave(flock);

		//Update velocity
		this.vel.add(acc.rmult(dt))

		//Update position
		this.pos.add(this.vel.rmult(dt))

		//Loop around the screen
		if (this.pos.x > sw || this.pos.x < 0)
			this.pos.x = this.px % sw;
		if (this.pos.y > sh || this.pos.y < 0)
			this.pos.y = this.pos.y % sh;
	}

	behave(flock) {
	    let acc = new vect2d(0, 0);

	    let averagePos = new vect2d(0, 0);
	    let dir = new vect2d(0, 0);
	    let separate = new vect2d(0, 0);

	    for (let other of flock) {
	      let d = this.pos.dist(other.pos);

	      if (other != this && d < this.perceptionRadius) {

	        if (d < this.minDistanceBtw) {
	          let diff = this.pos.diff(other.pos);
	          diff.normalize();
	          diff.div(d);
	          separate.add(diff);
	        }

	        let av = other.pos.diff(this.pos);
	        av.normalize();
	        av.div(d);
	        averagePos.add(av);

	        dir.add(other.vel);
	      }
	    }

	    separate.normalize();
	    dir.normalize();
	    averagePos.normalize();

	    acc.add(separate);
	    acc.add(dir);
	    acc.add(averagePos);
	    acc.normalize();

	    acc.setMag(this.steerForce);

	    return acc;
	  }
}
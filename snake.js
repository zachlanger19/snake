var scl;

function setup() {
	createCanvas(400, 400)
	frameRate(10);

	scl = 20;

	nagini = new snake();
	snack = new food(nagini);
	//noLoop();
}


function draw() {
	background(0);

	for (var i = 0; i < width/scl; i++) {
		stroke(255);
		line(i*scl, 0, i*scl, height);
	}
	for (var i = 0; i < height/scl; i++) {
		stroke(255);
		line(0, i*scl, height, i*scl);
	}

	//println(nagini.body[0].equals(snack.pos));
	if (nagini.body[0].equals(snack.pos)) {
		nagini.eat();
		snack = new food(nagini);
	}
	nagini.show();
	nagini.update();
	snack.show();


}

function snake() {
	//this.body = [createVector(0, 1)];
	this.body = [createVector(0, 1)];
	for (var i = 0; i < 100; i++){
		this.body.push(createVector(floor(random(100)),floor(random(100))));
	}
	this.prevPos = createVector();
	this.vel = createVector(0, 1);

	this.update = function() {
		var aboutToCollide = false;
		for (var i = 1; i < this.body.length; i++){
			if (this.body[0].x + this.vel.x == this.body[i].x && this.body[0].y + this.vel.y == this.body[i].y) {
				aboutToCollide = true;
			}
		}


		if (this.body[0].x + this.vel.x >= 0 &&
			this.body[0].x + this.vel.x < width/scl &&
			this.body[0].y + this.vel.y >= 0 &&
			this.body[0].y + this.vel.y < height/scl &&
			!aboutToCollide){

			this.prevPos.set(this.body[this.body.length - 1]);

			for (var i = this.body.length - 1; i > 0; i--){
				this.body[i].set(this.body[i - 1]);
			}
			this.body[0].add(this.vel);
		}

	}

	this.show = function() {
		noStroke();
		for (var i = 0; i < this.body.length; i++) {
			if (i == 0) {
				fill(100,255,100);
			} else {
				fill(100,200,100);
			}
			rect(this.body[i].x * scl, this.body[i].y * scl, scl, scl);
		}
	}

	this.dir = function(x, y) {
		this.vel = createVector(x, y);
	}

	this.eat = function() {
		this.body.push(createVector(0,0));
		println(this.body.length);
	}
}

function food(snake) {
	this.pos = createVector(floor(random(width/scl)), floor(random(height/scl)));

	this.show = function() {
		fill(255, 100, 100);
		rect(this.pos.x * scl, this.pos.y * scl, scl, scl);
	}
}

function keyTyped() {
		if (key === 'w') nagini.dir(0, -1);
		if (key === 'a') nagini.dir(-1, 0);
		if (key === 's') nagini.dir(0, 1);
		if (key === 'd') nagini.dir(1, 0);
}


var b;
var bt1;
var bt2;
var i=30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  b = new Ball(windowWidth/2, windowHeight/2, 50);
  bt1 = new Bat(200, windowHeight-i);
  bt2 = new Bat(200, i);
}

function draw() {
  background(220);
  b.move();
  b.checkEdge();
  b.show();

  bt1.show();
  bt2.show();

  // hit function
  if (b.y >= windowHeight-i || b.y <= i) {
    if (b.x <= mouseX + (this.width / 2) && b.x >= mouseX - (this.width / 2)) {
      b.bounce();
    }
  }
}

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = 3;
    this.ySpeed = 3;
  }

  show() {
    ellipse(this.x, this.y, this.r);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkEdge() {
    if (this.x >= width || this.x <= 0) {
      this.xSpeed *= -1;
    }

    // if (this.y >= height || this.y <= 0) {
    //   this.ySpeed *= -1;
    // }
  }

  bounce() {
    this.ySpeed *= -1;
  }
}

class Bat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 40;
  }

  show() {
    rectMode(CENTER);
    rect(mouseX, this.y, this.width, this.height);
  }
}
var nosex=0, nosey=0;
var nosenx=0;
var i=0;
var video;
var b;
var bt1;
var bt2;
var j=30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  pose = ml5.poseNet(video);
  pose.on('pose', getPoses);

  b = new Ball(windowWidth/2, windowHeight/2, 50);
  bt1 = new Bat(200, windowHeight-i);
  bt2 = new Bat(200, i);
}

function draw() {
  background(220);

  video.loadPixels();
  loadPixels();

  for (let y = 0 ; y < height ; y++){
    for (let x = 0 ; x < width ; x++){
      let index = (x + y * width) * 4;
      let vIndex = (width - x +1 + y * width) * 4;
        pixels[index] = video.pixels[vIndex];
        pixels[index+1] = video.pixels[vIndex+1];
        pixels[index+2] = video.pixels[vIndex+2];
        pixels[index+3] = 255;
    }
  }

  updatePixels();

  b.move();
  b.checkEdge();

  fill(255, 255, 0);
  b.show();

  bt1.show();
  bt2.show();

  if (nosex > windowWidth/2){
    i = nosex - windowWidth/2;
    nosenx = nosex - 2*i
  } else {
    i = windowWidth/2 - nosex;
    nosenx = nosex + 2*i
  }

  if (b.y >= windowHeight-j || b.y <= j) {
    if (b.x <= nosex + (this.width / 2) && b.x >= nosex - (this.width / 2)) {
      b.bounce();
    }
  }
}

function getPoses(poses) {
  if(poses.length > 0){
    nosex = poses[0].pose.keypoints[0].position.x;
    nosey = poses[0].pose.keypoints[0].position.y;
  }
}

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = 10;
    this.ySpeed = 15;
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

    if (this.y >= height || this.y <= 0) {
      this.ySpeed *= -1;
    }
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

    fill(255, 0, 0);
    rectMode(CENTER);

    if (nosex > windowWidth/2){
      i = nosex - windowWidth/2;
      nosenx = nosex - 2*i
    } else {
      i = windowWidth/2 - nosex;
      nosenx = nosex + 2*i
    }

    rect(nosenx, this.y, this.width, this.height);
  }
}
var nosex=0, nosey=0;
var nosenx=0;
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var xSpeed = (2, 7);
var ySpeed = 15;
var score = 0

// Canvas
function setup() {
  createCanvas(windowWidth, windowHeight-10);
  pixelDensity(1);

  // 相機設置
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  pose = ml5.poseNet(video);
  pose.on('pose', getPoses);
}

function draw() {
  // Background
  background(0);

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

  if (nosex > windowWidth/2){
    i = nosex - windowWidth/2;
    nosenx = nosex - 2*i
  } else {
    i = windowWidth/2 - nosex;
    nosenx = nosex + 2*i
  }

  // Paddle
  fill('#f00000');
  rect(nosenx-100, windowHeight-20, 200, 15);

  //Functions
  move();
  display();
  bounce();
  //resetBall();
  paddle();

  

  //Score
  fill('#000000');
  textSize(24);
  text("Score: " + score, 10, 25);
}
// Ball Functions
function move() {
  xBall += xSpeed;
  yBall += ySpeed;
}


function bounce() {

  if (xBall < 10 ||
    xBall > windowWidth - 20) {
    xSpeed *= -1;
  }
  if (yBall < 10 ||
    yBall > windowHeight - 20) {
    ySpeed *= -1;
  }
}


// Reset Ball
function resetBall() {
  if (yBall >= windowHeight ||
    yBall > windowHeight - 20) {
    ySpeed = 4;
  }
}

function display() {
  fill('#d9c3f7');
  ellipse(xBall, yBall, 50, 50);
}

// Bounce off Paddle
function paddle() {
  if (nosex > windowWidth/2){
    i = nosex - windowWidth/2;
    nosenx = nosex - 2*i
  } else {
    i = windowWidth/2 - nosex;
    nosenx = nosex + 2*i
  }

  if ((xBall > nosenx &&
      xBall < nosenx + 200) &&
    (yBall + 25 >= windowHeight-35)) {
    xSpeed *= -1;
    ySpeed *= -1;
    score++;

  }
}

// 鼻子偵測
function getPoses(poses) {
  if(poses.length > 0){
    nosex = poses[0].pose.keypoints[0].position.x;
    nosey = poses[0].pose.keypoints[0].position.y;
  }
}
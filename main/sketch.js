var nosex=0, nosey=0;
var nosenx=0;
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var xSpeed = (2, 7);
var ySpeed = 15;
var score = 0

var gameScreen = 0;
var bestScore = 0; 
var gameScreen = 0; 
var racket_w = 200;
var racket_h = 20;
var time = 200;

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
  if (gameScreen == 0) {
    initScreen();       
  } else if (gameScreen == 1) {  
    gamePlayScreen();            
  } else if (gameScreen == 2) {  
    gameOverScreen();           
  } 
}

function initScreen() {              
  background(236, 240, 241);       

  textAlign(CENTER);               
  fill(52, 73, 94);                
  textSize(100);                   
  text("反彈遊戲", width/2, height/2); 

  fill(92,167,182);                 
  noStroke();                       
  rectMode(CENTER);               
  rect(width/2, height-40, 200, 60, 5); 
  fill(236,240,241);         
  textSize(30);                   
  text("開始", width/2, height-30); 
}

function gamePlayScreen(){
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
  rect(nosenx, windowHeight-racket_h, racket_w, racket_h);

  //Functions
  move();
  display();
  bounce();
  //resetBall();
  paddle();

  if (time == 0){
    gameOver();
  } else {
    time--;
  }

  //Score
  textAlign(LEFT); 
  fill('#000000');
  textSize(24);
  text("Score: " + score, 10, 35);
  text("Time: " + time, 10, 65);

}

function gameOverScreen(){
  background(23, 24, 24,3);
  textAlign(CENTER);
  fill('#FFDC35');                
  textSize(100);  
  text("遊戲結束", width/2, height/2 - 100);
  text("成績："+score, width/2, height/2 + 100);
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
  if (yBall >= windowHeight) {
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

  if ((xBall > nosenx-racket_w/2 &&
      xBall < nosenx+racket_w/2) &&
    (yBall + 60 >= windowHeight)) {
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

// 定義鼠標事件
function mouseClicked() {
      
  if(gameScreen == 0){
    startGame();         
  } 
  if(gameScreen == 2){
    restart(); 
  } 
}

// 遊戲開始
function startGame(){ 
  gameScreen = 1;
}

// 遊戲結束
function gameOver(){    
  gameScreen = 2; 
} 

// 重啟遊戲
function restart(){ 
  gameScreen = 1;
  lastAddTime = 0;
  score = 0;
}

// 設置得分列印
function printScore() { 
  textAlign(LEFT); 
  fill(50);
  textSize(30);
  text("得分: "+score, 5*width/6, height/9);
} 
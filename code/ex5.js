var gameScreen = 0;
var bestScore = 0; 
var gameScreen = 0; 
var cld = 0;
var index = 1;

var nosex = 0, nosey = 0;
var nosenx = 0;
var i = 0;
var video;
var b;
var bt1;
var bt2;
var j = 30;

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
  // background(236, 240, 241);  
  // video.loadPixels();

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

function gameOverScreen(){
  background(23, 24, 24,3);
  textAlign(CENTER);
  text("遊戲結束", width/2, height/10);
    
  // if(bestScore<score){ 
  //   bestScore = score;
  // }
  // fill(255, 227, 132);
  // textSize(30);
  // text("最高分", width/2, height/10);
  // textSize(40);
  // text(bestScore, width/2, height/5);
    
  // fill(230, 180, 80);
  // textSize(30);
  // text("得分", width/2, height/2-110);
  // textSize(150);
  // text(score, width/2, height/2+50);

  // fill(92,167,182);
  // rectMode(CENTER);
  // noStroke();
  // rect(width/2, height-40, 200,60,5);
  // fill(236,240,241);
  // textSize(30);
  // text("重新开始", width/2, height-30);
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

    // if (this.y >= height+10 || this.y <=-10) {
    //   // this.ySpeed *= -1;
    //   gameOver();
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
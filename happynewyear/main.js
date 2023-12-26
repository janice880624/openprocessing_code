let particles = [];
let bigParticle;
let fontSize = 48;
let yPosition;
let letterSpacing = 10; 
let letters = []; 
let customFont;
var canvas_w = 800
var canvas_h = 600
var bNum=7;
var a = 0;
var b = 0;
var c = 0;
var cc = [];
var r=[];
var m=[];
let fireworksLayer;

let message = "Happy New Year 2024";
let fontSize2 = 50;

function setup() {
  createCanvas(canvas_w, canvas_h); 
	
	for (i = 0; i < bNum; i++) {
    r[i] = random(canvas_h / 4, canvas_h / 6 * 3);
    m[i] = random(canvas_h / 8, canvas_h / 6);
  }
	fireworksLayer2 = createGraphics(canvas_w, canvas_h);
  fireworksLayer2.background(0);
	textSize(fontSize2);
	textAlign(CENTER, CENTER);
}

function drawBuilding() {
 	stroke(255); 
  strokeWeight(2); 
  fill(50); 

  let x = 500; // 初始 X
  let y = 500; // 初始 Y 
  let width = 90; // 梯形寬
  let height = 45; // 梯形高
  let rectHeight1 = 15; 
  let rectHeight2 = 55; 

  for (let i = 0; i < 8; i++) {
    let currentY = y - height * i;
    quad(
      x + 10, currentY,
      x + width - 10, currentY,
      x + width, currentY - height,
      x, currentY - height
    );
  }

  let baseY = y;
  quad(
    x + width+10, 610, // 右下
    x-5,610, // 左下
    x + 10, baseY, // 左上
    x + width-10, baseY // 右上
  );

  let topRectY = y - height * 8 - rectHeight1;
  rect(x + 20, topRectY, width - 40, rectHeight1);
  
  let topRectY2 = y - height * 8 - rectHeight2 - rectHeight1;
  rect(x + 35, topRectY2, 20, rectHeight2);
	
	fill(255);
	ellipse(x + 45, baseY, 35, 35);
	
	fill(205, 173, 0);
	ellipse(x + 45, baseY, 30, 30);

  line(x + width / 2, y - height * 8- rectHeight2 - rectHeight1, x + width / 2, y - height * 10-10);
  
  for (let i = 0; i < 8; i++) {
    let currentY = y - height * i;
    if (frameCount % 60 === 0) { 
      let col = [random(0, 255), random(0, 255), random(0, 255)]; 
      let vxLeft = random(-3, -1);
      let vy = random(-5, -3);
      particles.push(new Particle(x, currentY, col, vxLeft, vy));

      let vxRight = random(1, 3);
      particles.push(new Particle(x + width, currentY, col, vxRight, vy));
    }
  }
}

class Particle {
  constructor(x, y, col, vx, vy) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255;

  }

  update() {
    this.vx *= 0.99; 
    this.vy += 0.1; 
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2; 
  }

  show() {
    noStroke();
    if (this.col && this.col.length === 3) {
      fill(this.col[0], this.col[1], this.col[2], this.alpha);
    } else {
      fill(255, this.alpha);
    }
    ellipse(this.x, this.y, 10);

  }
}

class BigParticle {
  constructor(x, y, col) {
    this.particles = [];
    this.col = col;

    for (let i = 0; i < 50; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 4);
      let vx = cos(angle) * speed;
      let vy = sin(angle) * speed;
      this.particles.push({ x, y, vx, vy, alpha: 255 });
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.vx *= 0.97;
      p.vy *= 0.97;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 2;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let p of this.particles) {
      noStroke();
      fill(this.col[0], this.col[1], this.col[2], p.alpha);
      ellipse(p.x, p.y, 5);
    }
  }
}

function draw() {
  background(0, 25); 
	drawBuilding(); 
	
 if (frameCount % 300 === 0) {
    let col = [random(0, 255), random(0, 255), random(0, 255)];
    bigParticle = new BigParticle(random(500, 600), 100, col);
  }

  if (bigParticle) {
    bigParticle.update();
    bigParticle.show();
  }

	// 建築物
  for (var i = 0; i < bNum; i++) {
    var q = map(i, 0,  bNum-1, width - width/bNum, 0);
    if (i % 2 == 0) {
      fill(50, 20);
      noStroke();
      bDing(q, height-r[i], 100, r[i]);
    } 
    else{
      fill(50, 20);
      noStroke(0);
      bDing(q, height-m[i], 255, m[i]);
    }
  }

  drawBuilding(); 
	
	fireworksLayer2.clear();
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
	
	image(fireworksLayer2, 0, 0);
}

function bDing(xPos, yPos, color, hei){
  push(); 
  translate(xPos, yPos);

	rect(0, 0, width/bNum, hei);
	fill(color);
	for(var d=50; d<hei; d+=50){
		noStroke();
		fill(random(35, 100), random(45, 166), random(125, 205), 20);
			rect(width/bNum/5, d, width/bNum/5, width/bNum/5);
		fill(random(45, 144), random(55, 355), random(105, 200), 20);
			rect(width/bNum/5*3, d, width/bNum/5, width/bNum/5);
	}
	pop();
}
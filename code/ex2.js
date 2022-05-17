// 偵測鼻子
let nosex=0, nosey=0;
let nosenx=0;
let i=0;
let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  pose = ml5.poseNet(video);
  pose.on('pose', getPoses);
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

  fill(255, 0, 0);
  if (nosex > windowWidth/2){
    i = nosex - windowWidth/2;
    nosenx = nosex - 2*i
  } else {
    i = windowWidth/2 - nosex;
    nosenx = nosex + 2*i
  }
  ellipse(nosenx, nosey, 50)
}

function getPoses(poses) {
  if(poses.length > 0){
    nosex = poses[0].pose.keypoints[0].position.x;
    nosey = poses[0].pose.keypoints[0].position.y;
  }
}
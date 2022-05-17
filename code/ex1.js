let video;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  // put drawing code here
  background(255);

  let gridSize = 20;

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let dia = map(r, 0, 255, gridSize, 2);


      fill(0);
      noStroke();
      circle(x, y, dia);
    }
  }
}
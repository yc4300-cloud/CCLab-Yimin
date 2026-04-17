// function setup() {
//   let canvas = createCanvas(800, 500);
//   canvas.parent("p5-canvas-container");
// }

let rectSize = 10;
let x = 0;
let speedX = 0.1;
let img;
let cam;

function preload() {
  img = loadImage("hopper1.png");
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  //createCanvas(800, 400);
  colorMode(HSB, 100);

  cam = createCapture(VIDEO);
  cam.size(320, 240);   // 摄像头原始比例 4:3
  cam.hide();
}

function draw() {
  background(255);

  // Draw gradient background
  for (let i = 0; i < width; i += rectSize) {
    let h = map(i, 0, width, 45, 55);
    fill(h, 20, 100);
    noStroke();
    rect(i, 0, rectSize, height);
  }

  // Draw hills
  fill(60, 30, 100);

  // Hill 1
  beginShape();
  curveVertex(0 + x, height);
  curveVertex(0 + x, height);
  curveVertex(width / 5 + x, height / 3);
  curveVertex(width / 2 + x, height / 5);
  curveVertex(width + x, height);
  curveVertex(width + x, height);
  endShape();

  // Hill 2
  beginShape();
  curveVertex(0 + x, height);
  curveVertex(0 + x, height);
  curveVertex(width / 8 + x, height / 1.5);
  curveVertex(width + x, height);
  curveVertex(width + x, height);
  endShape();

  // Hill 3
  beginShape();
  curveVertex(0 + x, height);
  curveVertex(0 + x, height);
  curveVertex(width * 5 / 8 + x, height / 2.8);
  curveVertex(width + x, height);
  curveVertex(width + x, height);
  endShape();
  

  // Animate hills
  x += speedX;
  if (x > width || x < -width) {
    speedX *= -1;
  }
  push()
  //scale(0.5)
  image(img,width/2-300/2+10,100,300,300)
  pop()

  // Pixel effect with image
  colorMode(RGB, 255);

  // Draw circular webcam in the center (keep aspect ratio)
  let cx = width / 2;
  let cy = height / 2-10;
  let diameter = 110;   // mirror diameter

  push();

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(cx, cy, diameter / 2, 0, TWO_PI);
  drawingContext.clip();

  // mirror image
  translate(cx, cy);
  scale(-1, 1);
  imageMode(CENTER);

  image(cam, 0, 0, 320, 240);
  drawingContext.restore();

  

  pop();

  colorMode(HSB, 100);
}
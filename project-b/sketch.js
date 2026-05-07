let jiao;
let maxDistance = 800;  

let river;
let cloud = [];
let x = 0;
let speedX = 0.1;

let img;
let cam;
let faceMesh;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };

let p_nose, p_right, p_left;
let scale_factor = 1;
let cx = 0;
let cy = 0;
let angle = 0;
let showBeaver = false;

function preload() {
  img = loadImage("hopperV2.png");
  faceMesh = ml5.faceMesh(options);
  jiao = loadSound("Beaver.mp3");
}

function setup() {
  createCanvas(800, 400);
  jiao.loop(); // Loop the sound
  jiao.setVolume(0); // Start silent
  userStartAudio();
  river = new River(height / 1.2);
  cam = createCapture(VIDEO);
  cam.size(800, 400);
  cam.hide();
  faceMesh.detectStart(cam, gotFaces);

  for (let i = 0; i < 5; i++) {
    cloud.push(new Cloud(random(width), random(20, 80), random(0.5, 1)));
  }
}

function mousePressed() {
  userStartAudio();
  if (jiao && jiao.isLoaded() && !jiao.isPlaying()) {
    jiao.loop();
  }
}

function draw() {
  background(162, 229, 242);

  if (p_right != undefined) {
    scale_factor = abs(p_right.x - p_left.x) / width;
    cx = p_nose.x;
    cy = p_nose.y;
    angle = atan2(p_left.x - p_right.x, p_left.y - p_right.y);
  }
  
  //distance for the sound
 square(1405/2,515/2,15)
  let d = dist(mouseX, mouseY, 1405/2, 515/2);
  let vol = map(d, 0, maxDistance, 1, 0);
  vol = constrain(vol, 0, 1);
  jiao.setVolume(vol);
  // push();
  // translate(width, 0);
  // scale(-1, 1);

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    p_nose = face.keypoints[4];
    p_right = face.keypoints[127];
    p_left = face.keypoints[356];
  }

  // 云朵
  for (let i = 0; i < 5; i++) {
    cloud[i].x = (width / 5) * i + (noise(frameCount * 0.005 + i * 10) + 0.5) * 40;
    cloud[i].update();
    cloud[i].display();
  }

  // Hill 1
  fill(60, 160, 80);
  beginShape();
  curveVertex(0 + x, height);
  curveVertex(0 + x, height);
  curveVertex(width / 5 + x, height / 3);
  curveVertex(width / 2 + x, height / 5);
  curveVertex(width + x, height);
  curveVertex(width + x, height);
  endShape();
  
  // 显示河狸
  if (mouseX > 695 && mouseX < 710 && mouseY > 250 && mouseY < 265) {
    showBeaver = true;
  }
  if (faces.length == 0 && showBeaver == true) {
    showBeaver = false;
  }
  if (showBeaver) {
    push();
    translate(cx, cy);
    let a = map(angle, 0.5, 2.7, PI / 2, -PI / 2);
    rotate(a);
    scale(-scale_factor, scale_factor);
    imageMode(CENTER);
    image(img, 0, 0);
    pop();
  }

  // Hill 2
  fill(60, 190, 80);
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
  curveVertex((width * 5) / 8 + x, height / 2.8);
  curveVertex(width + x, height);
  curveVertex(width + x, height);
  endShape();

  // pop();

  // 树干
  fill(138, 84, 19);
  noStroke();
  rect(width - 110, height / 2, 40, height, 10);

  // 树叶
  fill(34, 139, 34);
  ellipse(width - 120, height / 2 - 40, 120, 100);
  ellipse(width - 150, height / 2 - 20, 90, 80);
  ellipse(width - 50, height / 2 - 20, 90, 80);
  ellipse(width - 60, height / 2 - 60, 100, 80);
  ellipse(width - 90, height / 2 - 80, 120, 100);

  // 河狸手印
  drawBeaverPrint(width - 95, height / 2 + 60);


  // 山丘动画
  x += speedX;
  if (x > width || x < -width) {
    speedX *= -1;
  }

  river.update();
  river.display();
}

function gotFaces(results) {
  faces = results;
}

class River {
  constructor(y) {
    this.y = y;
    this.t = 0;
  }
  update() {
    this.t += 0.01;
  }
  display() {
    noStroke();
    fill(140, 230, 210);
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let offset = noise(x * 0.01, this.t) * 30;
      vertex(x, this.y + offset);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

function drawBeaverPrint(x, y) {
  fill(100, 50, 25);
  noStroke();
  ellipse(x, y, 16, 10);
  ellipse(x - 6, y - 6, 4, 6);
  ellipse(x, y - 8, 4, 6);
  ellipse(x + 6, y - 6, 4, 6);
}

class Cloud {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.s);
    noStroke();
    fill(255);
    ellipse(0, 0, 60, 60);
    ellipse(30, 0, 70, 70);
    ellipse(-30, 0, 70, 70);
    ellipse(0, -20, 80, 60);
    pop();
  }
  update() {}
}
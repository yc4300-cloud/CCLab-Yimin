/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

  let drawFood = false;
let xf = 0;
let yf = 0;
let xc = 0;
let yc = 0;
let sc = 0.5;
let cc=185;
let p =200
let r1=15
let r2=10

function setup() {}

function draw() {
  let canvas=createCanvas(800,500);
   canvas.id("p5-canvas");
   canvas.parent("p5-canvas-container");
  background(18, 170, 240);

  for (let i = 0; i <= width; i += 40) {
    let j = map(noise(i), 0, 1, 100, 300);
    drawWave(i, height / 5 + j);
  }
  drawCreature(xc, yc, sc, cc,p);
  for (let i = 20; i <= width; i += 30) {
    let j = map(noise(i * 0.1), 0, 1, 150, 300);
    drawWave(i, height / 3 + j);
  }

  if (drawFood == true) {
    food(xf, yf);
    xc = lerp(xc, xf, 0.1);
    yc = lerp(yc, yf, 0.1);
    let d = dist(xc, yc, xf, yf);
    if (d < 50) {
      drawFood = false;
      sc += 0.1;
    }
  } else { //this happens when drw food is false
    xc = lerp(xc, width * noise(frameCount * 0.001), 0.01);
    yc = lerp(yc, height * noise(frameCount * 0.002), 0.01);
    sc = lerp(sc, 0.1, 0.001);
  
  }
      if(sc < 1){
        cc=map(sc,1,0.1,185,0)
        p= 255
  
      }else if(sc> 2){
        cc=map(sc,2,10,255,0);
        p=50
          
               
     }else{
      cc=185
      p=200
      
      }

}

function mousePressed(){
  xf = mouseX;
  yf = mouseY;
  drawFood = true;
}

function drawWave(x, y) {
  push();
  translate(x, y);
  colorMode(HSB, 100);
  let h = map(noise(y * x), 0, 1, 20, 60);
  fill(h, 100, 80);

  noStroke();
  beginShape();
  let lineLength = 260;

  for (let i = 0; i <= lineLength; i += lineLength / 20) {
    let v = 10 * sin(frameCount * 0.1 - i);
    vertex(v, i);

    //circle(i, v, 5);
  }
  endShape();

  pop();
}

function drawCreature(a, b, s, c,p) {
  push();
  translate(a, b);
  scale(s);
  drawTail(10, 10, 0, 1.0, c,p);
  drawBody(10, 10, 0, 1.0, c,p);
  pop();
}

function drawBody(x, y, a, s, c,p) {
  push();
  translate(x, y);
  //rotate(PI/2)
  rotate(map(sin(frameCount * 0.05), -1, 1, PI / 2 - PI / 4, -PI / 16));

  scale(s);
  strokeWeight(2);
  fill(185, 185, c);
  noStroke();
  ellipse(0, 0, 150, 200);

  fill(255);
  strokeWeight(2);
  //eyes size=r1 眼白
  circle(10, -90, r1);
  circle(10, -50, r1);
  //blush clolor=p
  fill(255, p, 203);
  ellipse(20, -90, 5, 15);
  ellipse(20, -40, 5, 15);
  fill(255);
  strokeWeight(1);
  ellipse(40, 10, 66, 99);
  fill(0);//eye size=r2 眼黑
   circle(10, -90, r2);
   circle(10, -50, r2);
  triangle(20, -80, 20, -50, 28, -65);
  pop();
}

//tail
function drawTail(x, y, a, s, c) {
  if (mouseIsPressed == true) {
    x = lerp(x, mouseX, 0.01);
    y = lerp(y, mouseY, 0.01);
  }
  push();
  translate(x, y);
  //rotate(PI/2)
  rotate(map(sin(frameCount * 0.05), -1, 1, PI / 2 - PI / 8, -PI / 16));
  rotate(map(sin(frameCount * 0.5), -1, 1, PI / 8, -PI / 8));
  scale(s);
  fill(185, 185, c);
  noStroke();
  triangle(-15, 120, 30, 120, 7.5, 55);
  pop();
}

function food(x, y) {
    fill(random(255),random(255),random(255))
   noStroke();
  circle(x, y, 5+50*noise(x*y));
   
}
// let x,y,s,speedX;//create variables
// let x1,y1,s1,speedX1;//create variables
let x = []
let y = []
let s=[]
let speedX = []
function setup() {
  createCanvas(400, 400);
  //setup variables

x[0]= 0
y[0]= random(height)
s[0]=random(0.5,2)
speedX[0]=map(s(0), 0.5,2,5,0.5)
  // x=0
  // y=random(height)
  // s=random(0.5,2)
  // speedX=map(s,0.5,2,5,0.5)
  // //set up new variables
  //  x1=0
  // y1=random(height)
  // s1=random(0.5,2)
  // speedX1=map(s,0.5,2,5,0.5)
}

function draw() {
  background(220);
  drawCloud(x[0],y[0],s[0]);
  drawCloud(x[1],y[1],s[1]);
 //update variables
  x [0]+= speedX
  y[0]= y + map(sin(frameCount*0.1) ,-1 ,1 -5*s , 5*s )
  x[0]=50

  x[1] += speedX
  y[1] = y + map(sin(frameCount*0.1) ,-1 ,1 -5*s , 5*s )
  x[1] =50
  
  push();
  translate(x, y);
//swing
  let angle = map(sin(frameCount * 0.05), -1, 1, PI / 4, -PI / 4)
  rotate(angle);
//size
  scale(s);
  drawArms();
  noStroke();
//body
  fill(255);
  circle(0, 0, 100);
//around body
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    fill(255);
    circle(100 / 2 - 8, 0, 30);
    pop();
  }
  drawFace();
  pop();

}
function drawArms() {
  //arms
  beginShape();
  let lineLength2 = 70;
  noFill();
  for (let i = -lineLength2; i <= lineLength2; i += lineLength2 / 10) {
    strokeWeight(10);
    let v = 10 * sin(frameCount * 0.1 - i);
    vertex(i, v);
  }
  endShape();
}

function drawFace() {
  //face
  fill(0);
  circle(0 - 30, 0, 5);
  circle(0 + 30, 0, 5);
  arc(0, 0, 30, 30, 0, PI);
}




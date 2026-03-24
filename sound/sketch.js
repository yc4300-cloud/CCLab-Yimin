let mic
let sound;
let x;
let speedX=5
let s=50

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn()
  mic.start()
  x=s/2
  //sound.loop();
}

function draw() {
  background(220);
  if(mouseIsPressed){
 // sound.play();( here sound plays every frame and overlap)
  fill(0);
  circle( x, height/2,50)
  x+= speedX;
  if(x<0|| x> width){
    speedX=-speedX
     
  }
  }
}
function preload(){
  sound=loadSound("sounds/kick.mp3")
  sound1=loadSound("sounds/nyush.wav")
  
}
function mousePressed(){
  if(sound.isPlaying()==false){
  sound.play();
}else{
  sound.pause();
}
}
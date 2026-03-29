/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer; // dancer name "LOL"

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new  LOL (width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class LOL {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = sin(frameCount * 0.09) * 0.15;
;
    // add properties for your dancer here:
     

  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
     // wiggle angle
  this.angle = sin(frameCount * 0.09) * 0.15;


 
  }
  display() {
    push();
    translate(this.x, this.y);

  // face
  fill(255, 220, 80);
  noStroke();
  push();
  rotate(this.angle);
ellipse(0, 13, 110, 100);
  pop();

 // body
  fill(255, 220, 80);
      noStroke();
  ellipse(0, 20, 105, 90);

  // //hands
  //  push(); 
  //   rotate(this.angle * 2);  
  //   stroke(255, 220, 80);
  //   strokeWeight(10);
  //   noFill();
  //   beginShape();
  //   let lineLength = 100;
  //   noFill();
  //   for (let i = -lineLength; i <= lineLength; i += lineLength / 10) {
  //     let v = 10 * sin(frameCount * 0.1 - i);
  //     vertex(i, v);
  //     circle(i, v, 5)
  //   }
  //   endShape();
  //   pop();
    
   
  // left butt 
   fill(255, 220, 80);
   push();
  rotate(this.angle * 1.5);
   ellipse(-12, 40, 100, 90);
   pop();

  //right butt
    fill(255, 220, 80);
   push();
  rotate(this.angle * 1.5);  
   ellipse(12, 40, 100, 90);
   pop();

  // left eye
  fill(0);  
   push();
    rotate(-PI/12); 
  ellipse(-20, -10,12, 8);
  pop();

  //right eye
    fill(0);  
    push();
    rotate(PI/12); 
    ellipse(20, -10, 12, 8);
    pop();
  
  
  // mouth
  noFill();
  stroke(0);
  strokeWeight(2);
  ellipse(0, 8, 20, 8);


  
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    
    

    // ******** //
    // ⬇️ draw your dancer from here ⬇️





    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
 

    pop();
  }
  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
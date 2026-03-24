let scanned = [];
let frog;
let flowers;
let fly;
 
let indexfly = 0;
let indexfrog= 0;
let indexflowers=0; 


function preload() {
  for (let i = 1; i <= 5; i++) {
    scanned.push(loadImage( i + ".jpg"));
  }
}

function setup() {
  createCanvas(500, 500);

  eraseBg(scanned, 10);

  frog = crop(scanned, 0, 0, 400, 400);
  flowers=crop(scanned, 1600, 0, 650, 500);
  fly=crop(scanned,2114, 1300, 230, 300);

}

function draw() {
  background(255);
  

  // fly
  imageMode(CENTER);
  image(
    fly[indexfly],
    400,//location of drawing
    320,
    fly[0].width * 0.5,
    fly[0].height * 0.5
  );

  indexfly = 1+ floor((frameCount / 40) % (fly.length-1));
  console.log(indexfly)

  //frog
   imageMode(CENTER);
  image(
    frog[indexfrog],
    250,
    250,
    frog[0].width * 1,
    frog[0].height * 1
  );

   indexfrog = 1+ floor((frameCount / 40) % (frog.length-1));

  //flowers
 imageMode(CENTER);
  image(
    flowers[indexflowers],
    80,
    360,
    flowers[0].width * 1,
    flowers[0].height * 1

  );

   indexflowers = 1+ floor((frameCount / 40) % (frog.length-1));
 
}

 

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}

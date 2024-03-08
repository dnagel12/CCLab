let x, y, w, h;
let angle;

function setup() {
  createCanvas(800, 500);
  background(0);
  
  r = random(([0,255]));
  g = random(([0,255]));
  b  = random(([0,255]));
  
//  x = 0;
 x= random([0.1,2]);
 // y = 0;
 y= random([0.1,2]);
  //w = 15;
   w= random([10,15]);
  //h = 15;
  h= random([10,15]);

  angle = 0;
}

function draw() {
  background(50, 10);

  // x += 0.01;
  x += random([0.01, 0.15]);
  // y += 0.01;
  y += random([0.01, 0.15]);
  // w += 0.01;
  w += random([0.01, 0.15]);
  // h += 0.10;
  h += random([0.05, 0.25]);
 // angle += 15;
   angle += random([10, 20]);
  
 //console.log(x, y, w, h, angle)

  if (x >= 1007|| y >= 500 || w >= 500 || h >= 502) 
  
  {
   x = 1007;
  y = 500;
   w = 500;
   h = 502;
   angle = 10245;
  }

  push();
  // transformation to grow
  //translate(width / 2, height / 2);
  translate(mouseX, mouseY);
  rotate(radians(angle));
  scale(randomSeed([2, 5]));
  blendMode(ADD);
  fill(r, g, b);
  stroke(300, 10);

  ellipse(x, y, w, h);
  pop();
}3
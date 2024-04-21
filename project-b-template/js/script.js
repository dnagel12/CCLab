
let x, y, w, h;
let angle;


function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent("canvasContainer");
  

  background(0);

  x = 0; 
  y = 0;
  w = 20;
  h = 20;

  angle = 0;
}

function draw() {
  background(50,1);

  x += 0.10;
  y += 0.01;
  w += 0.01;
  h += 0.05;
  angle += 10;


  push();
  // transformation to grow 
  translate(width/2, height/2);
  rotate( radians(angle) );
  scale(4);
  blendMode(ADD) ;
  fill(2,0,0);
  stroke(200, 10);

  ellipse(x, y, w, h);
  pop();

  
}

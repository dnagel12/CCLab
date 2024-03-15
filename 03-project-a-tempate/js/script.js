let score = 0;
let timer = 0;
let flap = 0;
// Array to store flower positions
let flowers = [];
// Array to store particles
let particles = [];
// Clouds
let clouds = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 10, 10);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("p5-canvas-container");3
  // Add 5 random flowers
  for (let i = 0; i < 5; i++) {
    flowers.push(createVector(random(100, 500), random(200, 250)));
  }

  // Add clouds
  for (let i = 0; i < 5; i++) {
    let cloudX = random(width);
    let cloudY = random(100);
    let cloudSize = random(50, 100);

    let cloud = {
      x: cloudX,
      y: cloudY,
      size: cloudSize,
      speed: random(1, 3) // Adjust the speed as desired
    };

    clouds.push(cloud);
  }
}

function draw() {
  background(159, 189, 237);

  // Increase timer
  timer++;

  // flap
  flap++;

  // Rest of drawing code...

  if (timer % 100 == 0) {
    // Add flower every second (100 frames)
    flowers.push(createVector(random(50, 550), random(250, 380)));
  }

  // Pretty sky
  for (var i = 0; i <= 400; i += 5) {
    strokeWeight(5);
    stroke(255 - i, 128 - i, 64);
    line(0, 300 - i, width, 300 - i);
  }

  // Update and draw clouds
  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];

    cloud.x += cloud.speed;

    if (cloud.x > width + cloud.size) {
      cloud.x = -cloud.size;
    }

    fill(255, 200);
    noStroke();
    ellipse(cloud.x, cloud.y, cloud.size, cloud.size / 2);
    ellipse(cloud.x + cloud.size / 4, cloud.y - cloud.size / 4, cloud.size, cloud.size / 2);
    ellipse(cloud.x - cloud.size / 4, cloud.y - cloud.size / 4, cloud.size, cloud.size / 2);
  }
  // Ground
  noStroke();
  fill(0, 100, 0);
  rect(0, 300, 600, 600);
  
  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
  


 // Draw flowers
  flowers.forEach((flower) => {
    fill(200, 0, 0); // Red flower petals
   ellipse(flower.x, flower.y - 30, 20, 40);
 ellipse(flower.x - 20, flower.y, 40, 20);
   ellipse(flower.x + 20, flower.y, 40, 20);
    // Yellow flower center
  fill(255, 200, 0);
   ellipse(flower.x, flower.y, 20, 20);
    //Stem
  fill(0, 200, 70);
   rect(flower.x - 5, flower.y + 10, 10, 90);
  });
  

  // Draw and move bee
  drawBee(mouseX, mouseY);
  function drawBee(x, y) {
    fill(255, 255, 0); // Yellow bee body
    ellipse(x, y, 30, 20);

    fill(0, 0, 0); // Black bee stripes
    rect(x - 15, y - 10, 30, 5);

    // Wing animations
    let wingAngle = sin(flap / 10) * 20; // Oscillate from -20 to 20

    fill(255);

    // Left wing
    push();
    translate(x - 10, y - 10);
    rotate(wingAngle);
    ellipse(0, 0, 10, 15);
    pop();

    // Right wing
    push();
    translate(x + 10, y - 10);
    rotate(-wingAngle);
    ellipse(0, 0, 10, 15);
    pop();
  }

  // Check for collision with flowers
  checkCollision();

  text("Score: " + score, 10, 20);
}

function checkCollision() {
  // Loop through flowers
  for (let i = 0; i < flowers.length; i++) {
    // Check distance between bee and flower
    let d = dist(mouseX, mouseY, flowers[i].x, flowers[i].y);

    // If touching, add point and create particles
    if (d < 32) {
      score++;
      createParticles(flowers[i].x, flowers[i].y);
      flowers.splice(i, 1); // remove flower
    }
  }
}

function createParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    let particle = new Particle(x, y);
    particles.push(particle);
  }
}
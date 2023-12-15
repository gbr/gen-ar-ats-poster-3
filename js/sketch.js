var angle = 0;
var sound; // Declare a variable for the sound

function preload() {
  soundFormats("mp3");
  sound = loadSound(
    "https://accd-ats-sp23.s3.us-west-1.amazonaws.com/Etude+op25+n01+Harp+Etude.mp3"
  );
}

function setup() {
  createCanvas(895, 1280, WEBGL, document.getElementById("canvas-ar"));
  pixelDensity(1);
  frameRate(12);
  angleMode(DEGREES);
}

function mouseClicked() {
  if (sound.isPlaying()) {
    // .isPlaying() returns a boolean
    sound.pause(); // .play() will resume from .pause() position
    noLoop();
  } else {
    sound.play();
    loop();
  }
}

function draw() {
  background(200);
  push();
  rotate(angle);
  rectMode(CENTER);
  sphere(130);
  noFill();
  stroke(0);
  push();
  angle++;
  pop();

  for (var i = 0; i < 100; i++) {
    translate(i * 21, i * -i);
    stroke(12 * i);
    rotate(angle);
    rectMode(CENTER);
    sphere(130);
  }

  if (!sound.isPlaying()) {
    noLoop();
  }
}

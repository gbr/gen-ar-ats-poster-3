var angle = 0;
var sound; // Declare a variable for the sound
let offscreen;
let frameCounter = 0; // Initialize the frame counter

function preload() {
  sound = loadSound(
    "https://accd-ats-sp23.s3.us-west-1.amazonaws.com/stockhausen-1-cut-1.mp3"
  );
}

function setup() {
  sound.pause();
  // Create an offscreen canvas for WebGL rendering
  offscreen = createGraphics(895, 1280, WEBGL);

  // Set up your p5.js environment
  offscreen.pixelDensity(1);
  offscreen.frameRate(12);
  offscreen.angleMode(DEGREES);
}

// Cube debug
// function setup() {
//   offscreen = createGraphics(895, 1280, WEBGL);
// }
// function draw() {
//   offscreen.background(100);
//   offscreen.normalMaterial(); // Apply a normal material to the cube
//   offscreen.rotateX(millis() / 1000);
//   offscreen.rotateY(millis() / 1000);
//   offscreen.box(100); // Create a box with a size of 100
// }

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

// Function to get the current frame of the offscreen canvas
function getOffscreenImage() {
  if (offscreen) {
    return offscreen.elt.toDataURL();
  }
}

function draw() {
  if (offscreen) {
    offscreen.background(50); // Always render the background
    offscreen.noFill();

    if (sound.isPlaying()) {
      let maxSpheres = 30 * 2; // Max number of spheres
      let maxSize = 60 * 2; // Max size of the largest sphere
      let spacing = 90 * 2; // Space between each sphere
      let radius = 200; // Adjust as needed for the radius of the swirl

      for (var i = 0; i < maxSpheres; i++) {
        offscreen.push(); // Save the current drawing state
        let size = maxSize * (1 - i / maxSpheres); // Calculate size based on iteration

        // Create a swirl effect using trigonometric functions
        let angleOffset = angle + i * 10; // This 10 can be adjusted for tighter or looser swirl
        let x = radius * cos(angleOffset); // Swirling on x-axis
        let y = radius * sin(angleOffset); // Swirling on y-axis

        offscreen.translate(x, y); // Adjust position based on iteration
        offscreen.rotate(angleOffset); // Rotate by an angle that changes with each iteration
        offscreen.stroke(255); // Change the stroke color for each sphere
        offscreen.sphere(size); // Draw the sphere
        offscreen.pop(); // Restore the original drawing stated
      }

      angle += 1; // Increment the angle for the next frame
    }
  }
}

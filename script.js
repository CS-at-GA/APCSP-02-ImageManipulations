let original;
let workingImage;
let initialClick = false
let dragInfo = {}

function preload() {
  original = loadImage('GA.jpg');
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  fitToCanvas(original);
  workingImage = duplicate(original);
  background(255);
  noLoop();
}

function draw() {
  background('white')
  image(workingImage,0,0);
  if( dragInfo.startX && dragInfo.endX ) {
    noStroke();
    rectMode(CORNERS);
    fill(255,0,0,64);
    rect(dragInfo.startX, dragInfo.startY, dragInfo.endX, dragInfo.endY);
    rectMode(CORNER)
  }
}
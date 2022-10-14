let original;
let img;
let dragInfo = {}

function preload() {
  original = loadImage('GA.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fitToCanvas(original);
  img = copyOfOriginal();
  background(255);
  noLoop();
}

function draw() {
  background('white')
  image(img,0,0);
  if( dragInfo.startX && dragInfo.endX ) {
    noStroke();
    rectMode(CORNERS);
    fill(255,0,0,64);
    rect(dragInfo.startX, dragInfo.startY, dragInfo.endX, dragInfo.endY);
    rectMode(CORNER)
  }
}
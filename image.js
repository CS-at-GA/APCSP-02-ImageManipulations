function fitToCanvas(image) {
  if( image.width > width || image.height > height ) {
    if( image.width > image.height ) {
      image.resize(width,0);
    } else {
      image.resize(0,height);
    }
  }
}

function duplicate(image) {
  const copy = new p5.Image(image.width, image.height)
  copy.copy(image, 0, 0, image.width, image.height, 0,0,image.width, image.height);
  return copy;
}

function copyOfOriginal() {
  return duplicate(original);
}

function editOnSubsection( rect, editFunction ) {
  let editImg = createImageFrom(rect);
  editImg = editFunction(editImg);
  img.copy(editImg, 0, 0, editImg.width, editImg.height, rect.startX, rect.startY, editImg.width, editImg.height );  
}

function createImageFrom(rect, sourceImg=img) {
  const w = abs(rect.startX - rect.endX);
  const h = abs(rect.startY - rect.endY);
  const newImage = new p5.Image( w, h );
  newImage.copy( sourceImg, rect.startX, rect.startY, w, h, 0, 0, w, h )
  return newImage;
}

function getSurroundingPixels( image, x, y, depth = 1 ) {
  const i = indexOf(x,y,image);
  const s = (1 + depth * 2) * 4;
  let pixels = [];
  let startX = x - depth;
  let endX = x + depth;
  let startY = y - depth;
  let endY = y + depth;

  if( startX < 0 ) { startX = 0 } 
  if( endX >= image.width ) {endX =x } 
  if( startY < 0 ) { startY = 0 } 
  if( endY >= image.height ) {endY = y } 
  
  for( let i = startX; i <= endX; i++ ) {
    for( let j = startY; j <= endY; j++ ) {
      pixels = [...pixels, ...getChannelsAt(image,i,j)]
    }
  }

  return {pixels, startX, startY, endX, endY};
}

// assumes image.loadPixels
function getChannelsAt( image, x, y ) {
  const i = indexOf(x,y, image);
  if( i < 0 || i >= image.pixels.length ) {
    throw `attempted to access pixels out of range ${x},${y} vs. ${image.width},${image.height} (i:${i} pixels.length:${image.pixels.length})`
  }

  return [image.pixels[i], image.pixels[i+1], image.pixels[i+2], image.pixels[i+3]];
}

// helper for writing color to array
// https://p5js.org/reference/#/p5.Image
function writeColor(image, x, y, red, green, blue, alpha) {
  let index = indexOf(x,y, image);
  image.pixels[index] = red;
  image.pixels[index + 1] = green;
  image.pixels[index + 2] = blue;
  image.pixels[index + 3] = alpha;
}

function indexOf( x, y, image ) { return (x + y * image.width) * 4 }
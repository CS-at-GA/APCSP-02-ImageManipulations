function myAwesomeFilter(sourceImage) {
  console.log("hello")
  return sourceImage
}

function simpleBlackAndWhite(sourceImage) {
  const bwImg = duplicate(sourceImage);
  bwImg.loadPixels();
  for( let x = 0; x < bwImg.width; x++ ) {
    for( let y = 0; y < bwImg.height; y++ ) {
      const i = indexOf(x,y,bwImg);
      grayscaleValue = int((bwImg.pixels[i] + bwImg.pixels[i+1] + bwImg.pixels[i+2])/3);
      bwImg.pixels[i] = grayscaleValue;
      bwImg.pixels[i+1] = grayscaleValue;
      bwImg.pixels[i+2] = grayscaleValue;
    }
  }
  bwImg.updatePixels();
  return bwImg;
}

function simpleBlur(sourceImage) {
  const blurryImage = duplicate(sourceImage);
  sourceImage.loadPixels();
    blurryImage.loadPixels();
  for( let x = 0; x < blurryImage.width; x++ ) {
    for( let y = 0; y < blurryImage.height; y++ ) {
      const {pixels} = getSurroundingPixels(sourceImage, x, y);
      const pixelCount = pixels.length/4;
      const totals = [0,0,0,0]; // channel totals
      for( let i = 0; i < pixels.length; i+=4 ) {
        for( let j = 0; j < 4; j++ ) {
          totals[j] += pixels[i+j];
        }
      }
      writeColor(blurryImage, x, y, totals[0]/pixelCount, totals[1]/pixelCount, totals[2]/pixelCount, totals[3]/pixelCount );
    }
  }
  blurryImage.updatePixels();
  return blurryImage;
}
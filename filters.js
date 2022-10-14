function simpleBlackAndWhite(sourceImg=img) {
  const bwImg = duplicate(sourceImg);
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

function simpleBlur(sourceImg=img) {
  const blurryImg = duplicate(sourceImg);
  sourceImg.loadPixels();
  blurryImg.loadPixels();
  for( let x = 0; x < blurryImg.width; x++ ) {
    for( let y = 0; y < blurryImg.height; y++ ) {
      const {pixels} = getSurroundingPixels(sourceImg, x, y);
      const pixelCount = pixels.length/4;
      const totals = [0,0,0,0]; // channel totals
      for( let i = 0; i < pixels.length; i+=4 ) {
        for( let j = 0; j < 4; j++ ) {
          totals[j] += pixels[i+j];
        }
      }
      writeColor(blurryImg, x, y, totals[0]/pixelCount, totals[1]/pixelCount, totals[2]/pixelCount, totals[3]/pixelCount );
    }
  }
  blurryImg.updatePixels();
  return blurryImg;
}
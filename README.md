# Image Manipulations

## Pre-reads
* The P5 documentation for [p5.Image](https://p5js.org/reference/#/p5.Image). We will be editing a lot of pixels during this project, and understanding how to do that efficiently is going to be crucial. 
* [Seven greyscale conversion algorithms](https://tannerhelland.com/2011/10/01/grayscale-image-algorithm-vb6.html), which walks through the pseudocode involved in various different techniques. 
* Wildman Shiffman, conductor of [The Coding Train](https://thecodingtrain.com/) talks about [dithering](https://www.youtube.com/watch?v=0L2n8Tg2FwI). It should be noted that this is written in Processing, rather than p5 (Java, vs. JavaScript), so some adapting may be necessary. Here is the Wikipedia article on [Floyd-Steinberg Dithering](https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering).
* Blur

## Starter Code Overview

The starter code includes a few baseline algorithms, as well as a nifty key binding pattern.

### `script.js`

#### `preload`

#### `setup`

#### `draw`

#### `keyPressed`

## Assignment

### Requirements
* Your project must respond to user input.
* Your project must have a way to revert to the original image. 
* Your project must include an algorithm that that changes all pixels _or_ all pixels in a user-definable area, in a color-based way. For instance, you could press 'b' and all the pixels would convert to a black and white image, or you could click and drag your mouse over an area, press 'b' and all the pixels in that area would convert to black and white. 
* Your project must include an algorithm that uses surrounding pixels to generate a new pixel. Blurring or scaling would be examples of this. 
* Your project must include an algorithm that reduces the color palatte of an image. Posterization and dithering would be examples of this. 
* For each of the above filters, your algorithm must be implemented by *you* adjusting data on a pixel-by-pixel basis. You can not use any built in functionality. 

### _Some_ Ideas for Ways to Expand on This Project. 
* 


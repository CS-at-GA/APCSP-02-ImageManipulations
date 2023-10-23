# Image Manipulations

Don't forget to submit [help requests](https://github.com/CS-at-GA/APCSP-02-ImageManipulations/issues/new?assignees=gajoswald&labels=help+wanted&template=help-request.md&title=Help+Request), [requests for clarity](https://github.com/CS-at-GA/APCSP-02-ImageManipulations/issues/new?assignees=gajoswald&labels=documentation&template=request-for-clarity.md&title=Request+for+Clarity), or [bug reports](https://github.com/CS-at-GA/APCSP-02-ImageManipulations/issues/new?assignees=gajoswald&labels=bug&template=bug_report.md&title=) on github as well.

## Pre-reads
* The P5 documentation for [p5.Image](https://p5js.org/reference/#/p5.Image). We will be editing a lot of pixels during this project, and understanding how to do that efficiently is going to be crucial. 
* [Seven greyscale conversion algorithms](https://tannerhelland.com/2011/10/01/grayscale-image-algorithm-vb6.html), which walks through the pseudocode involved in various different techniques. 
* Wildman Shiffman, conductor of [The Coding Train](https://thecodingtrain.com/) talks about [dithering](https://www.youtube.com/watch?v=0L2n8Tg2FwI). It should be noted that this is written in Processing, rather than p5 (Java, vs. JavaScript), so some adapting may be necessary. Here is the Wikipedia article on [Floyd-Steinberg Dithering](https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering).[^1]
* [Box Blur](https://en.wikipedia.org/wiki/Box_blur)

## Starter Code Overview

The starter code includes some pixel editing utility functions, a few baseline algorithms, and a nifty key binding pattern. It is also broken up into multiple files for simplicity. You should be doing most of your work in `filters.js`. 

### `script.js`

Because of the way the code is broken up, this file is pretty spartan, containing loading code and code to draw the current version of the image, as well as the dragging rectangle. Perhaps the only noteworthy sections of this code are this `if` statement: 
```javascript
if( dragInfo.startX && dragInfo.endX ) 
```
which guards the drawing of the dragging rectangle. And the use of [`rectMode`](https://p5js.org/reference/#/p5/rectMode) which changes how the parameters of `rect` are interpreted. 

### `ui.js`

Here is all the code that deails with button presses and mouse things. 

#### Keybinding code

The traditional way to manage key presses is by using an `if` statement to discover what key has been pressed and then to act accordingly. It is a bit cleaner to leverage JavaScript's objects. Take, for instance, this code:

```javascript
const editBindings = {
  "b":simpleBlackAndWhite,
  "l":simpleBlur,
}
```

This creates an object (a structure that contains key/value pairs). The keys in this case are the letters we want our program to respond to and the values are the functions that corrospond to those keys. In this case, it is just the name of the functions, but we could also create anonymous functions. 

```javascript
const editBindings = {
  "b":simpleBlackAndWhite,
  "l":simpleBlur,
  "a":() => console.log("doing something awesome")
}
```

When you create a new filter, you will need to add a new binding to this object. The key will be a character and the value will be the name of the function. **Note:** if your filter ends up needing to take in parameters beyond `workingImage`, you'll need to create an anonymous function to handle that: `"x": () => myAwesomeFilter(workingImage, other, parameters),`

This structure tidies up `keyPressed` by using the `in` keyword to see if we should respond to a particular key (stored in the p5 variable `key` and then use `key` as the key into the object to get the correct function. Throw some parentheses on there (because it is a function call), capture the output and we're done.  

```javascript
if( key in editBindings ) {
  //...
  workingImage = editBindings[key](workingImage)   
  //...
}
```

The actual code there is a bit more complex because of the selective editing that is built in and the fact that I wanted two separate binding lists.[^2]

The rest of the code deals with handling the creation of a selection box. We update object variables (using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)) to identify the start and end of a drag, as well as being able to reset via double click. It should be noted that this will only work for boxes created by dragging from the top left to the bottom right. A bug, to be sure. 

### `image.js`

This file contains several utility functions for working with `p5.Image` objects. As you've read, it is way faster to work with the `pixels` array of a `p5.Image` than to use the `get` and `set` methods, so much of the code here deals with managing that complexity. 

#### `fitToCanvas`, `duplicate`

These are fairly straightforward and do not deal with `pixels`. 

#### `editOnSubsection`, and `createImageFrom` 

These functions also do not deal with the `pixels`, but rather handle the editing of a subsection of the image (defined by the dragging of the mouse). Essentially, a new image is created from the selection, the edit is applied to that image, and then the pixels are copied via the [`copy`](https://p5js.org/reference/#/p5.Image/copy) function to `sourceImage`


#### `getSurroundingPixels`

**This is probably the most important function to creating advanced filters.** The idea is that it returns all of the surrounding pixel information relative to a given pixel, (`x`,`y`), and at a given `depth`. It _does not_ keep the structure of the pixels (that is, it is a 1D array, instead of a 2D array) and it lops off any pixels that would overrun the edge of the image.[^3] This should be sufficient for many algorithms that are, for instance, averaging the values of the surrounding pixels. Further, it should be noted that while it says "pixels" it is actually returning the four channels that make up a pixel. 

#### `getChannelsAt` and `writeColor`

These are the channel equivalent of `get` and `set`. 

#### `indexOf`

A helper function to convert an x,y coordinate in an image to the appropriate index into `pixels`. 

### `filters.js`

**This is where you should be doing the bulk of your work.** It contains two simple filters as examples. It should be noted that as you develop your own filters, you should have them work on a source image, as in the example, so that they will automatically work with the selection. Also note the calls to `loadPixels` and `updatePixels` on the editing image that surround the changes.

#### `simpleBlackAndWhite`

This goes through the image, pixel-by-pixel, averages the color channel values, then sets each channel to that average. 

#### `simpleBlur`

This goes through the image, pixel-by-pixel, gets the average color values for all the surrounding pixels, then applies it to that pixel.

### `index.html`

You'll notice that more `<script>` tags have been added here to load the individual files. The order here matters, oddly. 

## Assignment

You will create two _novel_ image filters. 

### Requirements
* Your project must respond to user input.
* Your project must have a way to revert to the original image. 
* Your project must include an algorithm that that changes all pixels _or_ all pixels in a user-definable area, in a color-based way. For instance, you could press 'b' and all the pixels would convert to a black and white image, or you could click and drag your mouse over an area, press 'b' and all the pixels in that area would convert to black and white (**note:** the program _already_ does this, so you will need to do something else). 
* Your project must include an algorithm that uses surrounding pixels to update a pixel's values. Blurring or scaling would be examples of this (**note:** the program _already_ has a simple blurring algorithm, so you will need to choose a different bluring algorithm, or choose something else). 
* For both of the above filters, your algorithm must be implemented by *you* adjusting data on a pixel-by-pixel basis. You can not use any built in functionality to change how an image or a particlar pixel is rendered.
* For both of the above filters, you must document how you developed your filter, including the research that you did about it. Trial and error won't cut it as the basis of your development. 

The project _already_ responds to user input and has a way to revert to the original image (pressing the 'o' key), so you don't need to do much more than make sure it works for the filters you create. 

### _Some_ Ideas for Ways to Expand on This Project. 
* Saturate/desaturate
* Warping
* Pixelating 
* Advanced Blurring techniques
* Scaled effects
* Advanced masking

[^1]: [Color Quantization](https://en.wikipedia.org/wiki/Color_quantization) is an interesting topic unto itself.  The method there was called [k-means](https://www.nvidia.com/en-us/glossary/data-science/k-means/) and is also a Machine Learning Algorithm. 
[^2]: I suppose, though, they don't strictly need to be separated, but I do find this approach a bit cleaner. 
[^3]: The net effect of all of this is that if you need the structure of the extra pixels, you'll have to do that as part of whatever functionality you're developing. 
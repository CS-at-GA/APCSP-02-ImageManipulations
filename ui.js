const utilBindings = {
  "o":copyOfOriginal
}

// add new filters and key bindings here
const editBindings = {
  "b":simpleBlackAndWhite,
  "l":simpleBlur,
}

function keyPressed() {
  if( key in editBindings ) {
    if( dragInfo.startX && dragInfo.endX) {
      editOnSubsection(dragInfo, editBindings[key])
      dragInfo = {};  
    } else {
      img = editBindings[key]();      
    }
    redraw();
  }
  if( key in utilBindings ) {
    img = utilBindings[key]();
    redraw();    
  }
}

function mousePressed() {
  loop();
  dragInfo = {startX: mouseX, startY: mouseY }
}

function mouseDragged() {
  dragInfo = {...dragInfo, endX: mouseX, endY: mouseY }
}

function mouseReleased() { 
  dragInfo = {...dragInfo, endX: mouseX, endY: mouseY }
  if( dragInfo.startX > dragInfo.endX && dragInfo.startY < dragInfo.endY ) {
    [dragInfo.startX, dragInfo.endX] = [dragInfo.endX, dragInfo.startX]
  } else if( dragInfo.startX < dragInfo.endX && dragInfo.startY > dragInfo.endY ) {
    [dragInfo.startY, dragInfo.endY] = [dragInfo.endY, dragInfo.startY]
  } else if( dragInfo.startX > dragInfo.endX && dragInfo.startY > dragInfo.endY ) {
    // I will admit to not understanding why the 
    // above destructuring approach doesn't work here
    tempX = dragInfo.startX;
    tempY = dragInfo.startY;
    dragInfo.startX = dragInfo.endX;
    dragInfo.startY = dragInfo.endY;
    dragInfo.endX = tempX;
    dragInfo.endY = tempY;
  }
  noLoop();
}

function doubleClicked() {
  dragInfo = {};
  redraw();
}
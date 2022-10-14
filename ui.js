const utilBindings = {
  "o":copyOfOriginal
}

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
  dragInfo = {...dragInfo, startX: mouseX, startY: mouseY }
}

function mouseDragged() {
  dragInfo = {...dragInfo, endX: mouseX, endY: mouseY }
}

function mouseReleased() {
  dragInfo = {...dragInfo, endX: mouseX, endY: mouseY }
  noLoop();
}

function doubleClicked() {
  dragInfo = {};
  redraw();
}
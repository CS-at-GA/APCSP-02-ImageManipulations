const utilBindings = {
  "o":() => duplicate(original)
}

// add new filters and key bindings here
const editBindings = {
  "b":simpleBlackAndWhite,
  "l":simpleBlur,
  "j":myAwesomeFilter,
}

function keyPressed() {
  if( key in editBindings ) {
    if( dragInfo.startX && dragInfo.endX && dragArea() > 0 ) {
      editOnSubsection(dragInfo, editBindings[key], workingImage)
      dragInfo = {};  
    } else {
      workingImage = editBindings[key](workingImage);      
    }
    redraw();
  }
  if( key in utilBindings ) {
    workingImage = utilBindings[key]();
    redraw();    
  }
}

function mousePressed() {
  if( !initialClick ) {
    initialClick = true
  } else {
    loop();
    dragInfo = {startX: mouseX, startY: mouseY }
  }

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

function dragArea() {
  return (dragInfo.endX - dragInfo.startX) * (dragInfo.endY - dragInfo.startY)
}

function doubleClicked() {
  dragInfo = {};
  redraw();
}
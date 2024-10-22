// https://editor.p5js.org/jht9629-nyu/sketches/iIIAb8KIDr
// p5moLibrary Astronomical 47

// Display regions of a Astronomical infographic with animated panning and zooming
// Shift click to define rect region in left or right pane
// Save defined regions in local storage and export as JSON

let my = {};

function preload() {
  //
  my.version = '?v=119';

  my.backgImg = loadImage('../../assets/Manju.jpg');

  // console.log('preload my.backgImg width', my.backgImg.width, my.backgImg.height);
  // my.backgImg width 1 1
}

function setup() {
  //
  console.log('setup my.backgImg width', my.backgImg.width, my.backgImg.height);
  // setup my.backgImg width 8384 9970

  my_setup();

  my.animLoop = new Anim({ target: my, time: 15 });
  if (my.scanFlag) {
    my.animLoop.start();
  }
}

function draw() {
  //
  background(0);
  my.pane1.render();
  my.pane0.render();
  ui_init_update();
  if (my.mouseTracking) {
    my.pane.mouseDragged();
  }
  draw_crossHairs();
  drawCycleCount();

  my.animLoop.step({ action: nextRefAction, loop: my.scanFlag });
}

function drawCycleCount() {
  let lapse = my.animLoop.lapse();
  let { x0, y0, width, height } = my.pane0;
  let h = floor(height * 0.025);
  let y = y0 + height - h;
  let x = x0;
  let str = Number(lapse).toFixed(1).padStart(4, '0');
  str = str + ' ' + my.cycleCount;
  fill(0);
  noStroke();
  rect(x, y, width, h);
  fill(255);
  textSize(h);
  text(str, x, y + h);
}

function formatNum(num) {
  return Number(num).toLocaleString();
}

function draw_crossHairs() {
  stroke(255);
  strokeWeight(1);
  for (let ment of my.mouseXYs) {
    line(ment.x, 0, ment.x, height);
    line(0, ment.y, width, ment.y);
  }
  if (my.shiftTracking) {
    line(mouseX, 0, mouseX, height);
    line(0, mouseY, width, mouseY);
  }
}

// --
// 2024-03-22 use jpg version in p5 editor to preserver dimensions
// Bad gateway error on p5 editor server

//

// https://github.com/molab-itp/p5moLibrary

// https://editor.p5js.org/jht9629-nyu/sketches/K_xe4i5md

// https://commons.wikimedia.org/wiki/File:The_Celestial_Zoo_infographic_wikimedia.png
// Infographic listing 210 notable astronomical objects marked on a central
// logarithmic map of the observable universe. A small view and some distinguishing
// features are included for each astronomical object

// https://en.wikipedia.org/wiki/Astronomical_object
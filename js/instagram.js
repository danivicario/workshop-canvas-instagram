// Dani Vicario - instagram experiment (canvas)- Thu 5 Nov 2020 00:22:08 CET
function getPixelColor(imageData, col, row) {
  return {
    r: imageData.data[row * (imageData.width * 4) + col * 4 + 0],
    g: imageData.data[row * (imageData.width * 4) + col * 4 + 1],
    b: imageData.data[row * (imageData.width * 4) + col * 4 + 2]
  };
}

let imageData;
let img;
let pencilSize = 1;

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  'normal': 'source-over',
  'source-in': 'source-in',
  'source-out': 'source-out',
  'source-atop': 'source-atop',
  'destination-over': 'destination-over',
  'destination-in': 'destination-in',
  'destination-out': 'destination-out',
  'destination-atop': 'destination-atop',
  'lighter': 'lighter',
  'copy': 'copy',
  'xor': 'xor',
  'multiply': 'multiply',
  'screen': 'screen',
  'overlay': 'overlay',
  'darken': 'darken',
  'lighten': 'lighten',
  'color-dodge': 'color-dodge',
  'color-burn': 'color-burn',
  'hard-light': 'hard-light',
  'soft-light': 'soft-light',
  'difference': 'difference',
  'exclusion': 'exclusion',
  'hue': 'hue',
  'saturation': 'saturation',
  'color': 'color',
  'luminosity': 'luminosity'
};

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById('canvas');

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext('2d');

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let w, h, w2, h2;

// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute('height', window.innerHeight);
canvasDOMEl.setAttribute('width', window.innerWidth);

ctx.save();

function draw() {
  w = window.innerWidth;
  h = window.innerHeight;
  // eslint-disable-next-line no-unused-vars
  w2 = w / 2;
  // eslint-disable-next-line no-unused-vars
  h2 = h / 2;

  ctx.drawImage(img, 0, 0, w, h);
  imageData = ctx.getImageData(0, 0, w, h);
}

function applyFilter1() {
  ctx.clearRect(0, 0, w, h);
  let posX = w,
    posY = h;

  for (let i = 0; i < w * h; i++) {
    ctx.beginPath();

    if (posX < 0) {
      posY -= 1;
      posX = w;
    }

    let { r, g, b } = getPixelColor(imageData, posX, posY);
    var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (randomInt(0, 0) === 0) {
      ctx.fillStyle = `rgb(${v},${v},${v}, 1)`;
      ctx.rect(posX, posY, 1, 1);
      posX -= 1;
    } else {
      ctx.fillStyle = `rgb(${v},${v},${v}, 1)`;
      ctx.rect(posX, posY, 25, 1);
      posX -= 25;
    }
    ctx.fill();
    ctx.closePath();
  }
}

function applyFilter2() {
  debugger;
  ctx.translate(w, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0, w, h);
}

function loadImage(id) {
  img = new Image();
  img.src = 'img/img2.jpg';
  img.onload = () => {
    window.requestAnimationFrame(() => {
      draw();
    }, 10);
  };

  window.onresize = () => {
    draw();
  };
}

function enablePen() {
  canvas.addEventListener('mousemove', function (event) {
    ctx.beginPath();
    // pick(event, hoveredColor);
    // console.log(event);

    let { r, g, b } = getPixelColor(imageData, event.layerX, event.layerY);
    // var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // d[i] = d[i+1] = d[i+2] = v
    ctx.rect(event.layerX, event.layerY, pencilSize, pencilSize);
    ctx.fillStyle = `rgb(${255},${0},${0}, 1)`;
    ctx.fill();
    ctx.closePath();
  });
}

function resetTools() {}
function initValues() {
  toolsPencilValue();
}
function toolsPencilValue() {
  document.querySelector('#tools-pencil-value').innerHTML = pencilSize =
    document.querySelector('#tools-pencil-slider').value;
}
function initMenu() {
  initValues();
  enableFilters();
}

function enableFilters() {
  document.querySelector('#filters-bw').onclick = () => {
    applyFilter1();
  };

  document.querySelector('#filters-flip').onclick = () => {
    applyFilter2();
  };
}

document.querySelector('#tools-pencil').onclick = () => {
  resetTools();
  enablePen();
};

document.querySelector('#tools-pencil-slider').onchange = () => {
  toolsPencilValue();
};

initMenu();

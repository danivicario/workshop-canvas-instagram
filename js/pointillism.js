// Dani Vicario - instagram experiment (canvas)- Thu 23 Sep 2021 00:22:08 CET

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

canvasDOMEl.setAttribute('width', window.innerWidth);
canvasDOMEl.setAttribute('height', window.innerHeight);

w = window.innerWidth;
h = window.innerHeight;
w2 = w / 2;
h2 = h / 2;

let img = new Image();
img.src = '../img/img3.jpg';
let posX = 0;
let iterations = 23698;
let circleRadius = 23;

document.querySelector('#slider-iterations-value').innerHTML = iterations;
document.querySelector('#slider-circle-radius-value').innerHTML = circleRadius;

img.onload = function () {
  document.querySelector('#slider-iterations').onchange = (e) => {
    document.querySelector('#slider-iterations-value').innerHTML = iterations = e.target.value;
  };

  document.querySelector('#slider-circle-radius').onchange = (e) => {
    document.querySelector('#slider-circle-radius-value').innerHTML = circleRadius = e.target.value;
  };

  document.querySelector('#run').onclick = () => {
    drawProject();

    window.onresize = function () {
      drawProject();
    };
  };
};

let imageData;
let colorOffset = 255;

function getPixelColor(imageData, col, row) {
  return {
    r: imageData.data[row * (imageData.width * 4) + col * 4 + 0],
    g: imageData.data[row * (imageData.width * 4) + col * 4 + 1],
    b: imageData.data[row * (imageData.width * 4) + col * 4 + 2]
  };
}

function drawProject() {
  ctx.drawImage(img, 0, 0);
  let imageData = ctx.getImageData(0, 0, w, h);
  ctx.clearRect(0, 0, w, h);

  let posX, posY;
  let positionsSet = new Set();

  for (let i = 0; i < iterations; i++) {
    posX = randomInt(0, img.width);
    posY = randomInt(0, img.height);

    positionsSet.add(`${posX}, ${posY}`);
  }

  const positions = [...positionsSet].map((position) => {
    const split = position.split(',');
    return { posX: +split[0], posY: +split[1] };
  });

  console.log(positions);

  for (let i = 0; i < positions.length; i++) {
    const { posX, posY } = positions[i];
    let color = getPixelColor(imageData, posX, posY);

    ctx.beginPath();
    ctx.arc(posX, posY, randomInt(1, circleRadius), 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random()})`;
    ctx.fill();
    ctx.closePath();
  }
}

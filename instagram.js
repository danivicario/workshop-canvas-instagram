// Dani Vicario - instagram experiment (canvas)- Thu 5 Nov 2020 00:22:08 CET

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  "normal": "source-over",
  "source-in": "source-in",
  "source-out": "source-out",
  "source-atop": "source-atop",
  "destination-over": "destination-over",
  "destination-in": "destination-in",
  "destination-out": "destination-out",
  "destination-atop": "destination-atop",
  "lighter": "lighter",
  "copy": "copy",
  "xor": "xor",
  "multiply": "multiply",
  "screen": "screen",
  "overlay": "overlay",
  "darken": "darken",
  "lighten": "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "difference": "difference",
  "exclusion": "exclusion",
  "hue": "hue",
  "saturation": "saturation",
  "color": "color",
  "luminosity": "luminosity"
};

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

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

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

ctx.save();

function draw() {
  w = window.innerWidth;
  h = window.innerHeight;
  // eslint-disable-next-line no-unused-vars
  w2 = w / 2;
  // eslint-disable-next-line no-unused-vars
  h2 = h / 2;

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  var imgData = ctx.getImageData(0, 0, w, h);
  ctx.clearRect(0, 0, w, h);
  let step = 2;
  let counter = 0;
  let xxx = Math.floor(w / 20);

  for (let i = 0, posX = 0, posY = 0; i < imgData.data.length; i += 4) {
    // imgData.data[i] = 255 + imgData.data[i];
    // imgData.data[i + 1] = 255 - imgData.data[i + 1];
    // imgData.data[i + 2] = 255 - imgData.data[i + 2];
    // imgData.data[i + 3] = 255 - imgData.data[i + 3];
    // imgData.data[i + 1] = randomInt(0, 255);
    // imgData.data[i + 2] = randomInt(0, 255);
    ctx.beginPath();

    if (posX === w) {
      posY += step / 2;
      posX = 0;
      counter = w * 4;
    }

    ctx.arc(posX, posY, 10, 0, 2 * Math.PI);

    ctx.fillStyle = `rgba(${imgData.data[counter]},${imgData.data[counter + 1]},${
      imgData.data[counter + 2]
    }, .5)`;

    ctx.fill();
    ctx.closePath();

    posX += xxx;
    counter += xxx * 4;
  }

  // ctx.clearRect(0, 0, w, h);
  // ctx.putImageData(imgData, 0, 0);
}
let img = new Image();
img.src = "./img.jpg";
img.onload = () => {
  window.requestAnimationFrame(() => {
    draw();
  }, 10);
};

window.onresize = () => {
  draw();
};

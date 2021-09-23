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

canvasDOMEl.setAttribute("width", window.innerWidth);
canvasDOMEl.setAttribute("height", window.innerHeight);

w = window.innerWidth;
h = window.innerHeight;
w2 = w / 2;
h2 = h / 2;

// ctx.save();

// for (let i = 100000; i > 0; i--) {
//   ctx.beginPath();
//   ctx.arc(randomInt(0, w), randomInt(0, h), randomFloat(1, 30), 0, PI_DOUBLE);

//   let red = randomInt(0, 255);
//   let green = randomInt(0, 255);
//   let blue = randomInt(0, 255);
//   let opacity = Math.random();

//   // ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

//   // ctx.fill();

//   ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

//   ctx.stroke();
//   ctx.closePath();
// }

// Array(100)
//   .fill()
//   .map(() => {
//     ctx.beginPath();
//     ctx.arc(randomInt(0, w), randomInt(0, h), randomFloat(1, 30), 0, PI_DOUBLE);

//     let red = randomInt(0, 255);
//     let green = randomInt(0, 255);
//     let blue = randomInt(0, 255);
//     let opacity = Math.random();

//     // ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

//     // ctx.fill();

//     ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

//     ctx.stroke();
//     ctx.closePath();
//   });

let img = new Image();
img.src = "./img.jpg";
let posX = 0;
let iterations, circleRadius;

img.onload = function () {
  document.querySelector("#slider-iterations").onchange = (e) => {
    document.querySelector("#slider-iterations-value").innerHTML = iterations = e.target.value;
  };

  document.querySelector("#slider-circle-radius").onchange = (e) => {
    document.querySelector("#slider-circle-radius-value").innerHTML = circleRadius = e.target.value;
  };

  document.querySelector("#run").onclick = () => {
    drawProject();

    window.onresize = function () {
      drawProject();
    };
  };
};

let imageData;
let colorOffset = 255;

// function drawProject() {
//   ctx.drawImage(img, 0, 0);
//   imageData = ctx.getImageData(0, 0, w, h);
//   ctx.clearRect(0, 0, w, h);
//   colorOffset -= 5;

//   // imageData.data --> each value is an Uint8ClampedArray

//   for (var i = 0; i < imageData.data.length; i += 4) {
//     //red ==>
//     imageData.data[i] = randomInt(-255, 255); //imageData.data[i] - colorOffset;
//     //green ==>
//     // no-op imageData.data[i+ 1] ;
//     // imageData.data[i + 1] = imageData.data[i + 1] - colorOffset;
//     imageData.data[i + 1] = randomInt(-255, 255); //imageData.data[i] - colorOffset;
//     //blue ==>
//     // no-op imageData.data[i+ 2] ;
//     imageData.data[i + 2] = randomInt(-255, 255); //imageData.data[i] - colorOffset;
//     //alpha ==>
//     // no-op imageData.data[i+ 3] ;
//   }

//   ctx.putImageData(imageData, 0, 0);
//   window.requestAnimationFrame(drawProject);
// }

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

  for (let i = 0; i < iterations; i++) {
    posX = randomInt(0, img.width);
    posY = randomInt(0, img.height);

    let color = getPixelColor(imageData, posX, posY);

    ctx.beginPath();
    ctx.arc(posX, posY, randomInt(1, circleRadius), 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random()})`;
    ctx.fill();
    ctx.closePath();
  }
}

// window.requestAnimationFrame(drawProject);

// function drawProject() {
//   w = window.innerWidth;
//   h = window.innerHeight;
//   w2 = w / 2;
//   h2 = h / 2;

//   ctx.clearRect(0, 0, w, h);

// ctx.save();
// ctx.translate(posX++, 0);
// ctx.drawImage(img, 0, 0, w, h);
// ctx.restore();

//   window.requestAnimationFrame(drawProject);
// }

// window.requestAnimationFrame(drawProject);

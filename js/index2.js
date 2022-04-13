let w, h, w2, h2;
w = window.innerWidth;
h = window.innerHeight;
w2 = w / 2;
h2 = h / 2;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/** @type HTMLCanvasElement */
const objetoDOMCanvas = document.querySelector('#canvas');

/** @type CanvasRenderingContext2D */
const ctx = objetoDOMCanvas.getContext('2d');

canvas.setAttribute('width', w);
canvas.setAttribute('height', h);

// Process I - imperative approach

// for (let i = 0; i < 100; i++) {
// ctx.fillStyle = `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)} , ${randomInt(0, 255)}, .5)`;
// ctx.beginPath();
// posX = randomInt(0, w);
// posY = randomInt(0, h);
// scale = randomInt(5, 200);
// ctx.arc(posX, posY, scale, 0, 2 * Math.PI);
// ctx.fill();
// ctx.closePath();
// }

/////////////////////////////////////////////////////////////////////

// Process II - animation

// const painter = () => {
//   let posX = 0,
//     posY,
//     scale,
//     angle = 0;

//   const intervalId = setInterval(() => {
//     // ctx.fillStyle = `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)} , ${randomInt(0, 255)}, .5)`;
//     ctx.fillStyle = `rgba(${randomInt(0, 255)},0, 0, 1)`;
//     ctx.beginPath();
//     posX += 1;
//     posY = h2;
//     scale = randomInt(5, 5);
//     angle++;
//     ctx.arc(posX, posY + 250 * Math.cos((angle * Math.PI) / 180), scale, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.closePath();

//     // if (posX > w2) clearInterval(intervalId);
//   }, 10);
// };

// painter();

/////////////////////////////////////////////////////////////////////

// Process III - declarative approach
// Array(w)
//   .fill()
//   .forEach((_) => {
//     ctx.fillStyle = `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)} , ${randomInt(0, 255)}, .5)`;
//     ctx.beginPath();
//     posX = randomInt(0, w);
//     posY = randomInt(0, h);
//     scale = randomInt(5, 200);
//     ctx.arc(posX, posY, scale, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.closePath();
//   });

/////////////////////////////////////////////////////////////////////

// Process IV - image load
function getPixelColor(imageData, x, y) {
  return {
    r: imageData.data[y * (imageData.width * 4) + x * 4 + 0],
    g: imageData.data[y * (imageData.width * 4) + x * 4 + 1],
    b: imageData.data[y * (imageData.width * 4) + x * 4 + 2]
  };
}

const img = new Image();
img.src = '../img/img2.jpg';

img.onload = () => {
  let iterations = 0;

  const draw = () => {
    const { width: imageWidth, height: imageHeight } = img;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, w, h);

    let RGB, posX, posY;

    for (let i = 0; i < iterations; i++) {
      posX = randomInt(0, imageWidth);
      posY = randomInt(0, imageHeight);

      RGB = getPixelColor(imageData, posX, posY);

      // ctx.beginPath();
      // ctx.fillStyle = `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, .25)`;
      // ctx.rect(posX, posY, 30, 30);
      // ctx.fill();
      // ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, .25)`;
      ctx.arc(posX, posY, randomInt(10, circleRadius / 80), 0, 20 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }

    // ctx.drawImage(img, w2 - width / 2, h2 - height / 2);

    // for (let i = 0; i < 100; i++) {
    //   ctx.drawImage(img, randomInt(0, w), randomInt(0, h), width / 20, height / 20);
    // }

    const param1 = document.querySelector('#param1');
    const param2 = document.querySelector('#param2');

    param1.onchange = (e) => {
      iterations = +e.target.value;

      console.log(iterations);

      draw();
    };

    param2.onchange = (e) => {
      console.log(e.target.value);
      circleRadius = e.target.value;
      draw();
    };
  };

  draw();
};

// Dani Vicario - instagram experiment (canvas)- Thu 5 Nov 2020 00:22:08 CET

function getPixelColor(imageData, col, row) {
  return {
    r: imageData.data[row * (imageData.width * 4) + col * 4 + 0],
    g: imageData.data[row * (imageData.width * 4) + col * 4 + 1],
    b: imageData.data[row * (imageData.width * 4) + col * 4 + 2]
  };
}

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

const paintCosineFn = (mode = 'circle') => {
  if (mode !== 'square' && mode !== 'circle') throw new Error('Chosen shape is not supported');

  for (let posX = 0; posX < w; posX++) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, .3)`;

    if (mode === 'square') {
      ctx.rect(
        posX,
        h2 + 100 * Math.cos((posX * Math.PI) / 180),
        randomInt(5, 100),
        randomInt(5, 100)
      );
    }

    if (mode === 'circle') {
      ctx.arc(posX, h2 + 100 * Math.cos((posX * Math.PI) / 180), randomInt(5, 100), 0, 2 * Math.PI);
    }

    ctx.fill();
    ctx.closePath();
  }
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, w, h);
};

const animateCanvas = () => {
  let posX = 0;

  setInterval(() => {
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,0,0, 1)`;
    ctx.arc(posX++, h2 + 200 * Math.cos((posX * Math.PI) / 180), randomInt(10, 30), 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }, 10);
};

const animateImage = () => {
  let tuiBird = new Image();
  tuiBird.src = '../img/img3.jpg';

  tuiBird.onload = () => {
    let scale = 10;
    let rotation = 0;

    setInterval(() => {
      scale -= 0.1;

      ctx.save();
      // ctx.clearRect(0, 0, w, h);
      ctx.translate(w2, h2);
      ctx.rotate(((rotation += 3.5) * Math.PI) / 180);
      ctx.drawImage(tuiBird, 0, 0, tuiBird.width / scale, tuiBird.height / scale);
      ctx.restore();
    }, 10);
  };
};

const photoshopFilter = () => {
  function getPixelColor(imageData, col, row) {
    return {
      r: imageData.data[row * (imageData.width * 4) + col * 4 + 0],
      g: imageData.data[row * (imageData.width * 4) + col * 4 + 1],
      b: imageData.data[row * (imageData.width * 4) + col * 4 + 2]
    };
  }

  let tuiBird = new Image();
  tuiBird.src = '../img/img2.jpg';

  tuiBird.onload = () => {
    ctx.drawImage(tuiBird, 0, 0);
    let imageData = ctx.getImageData(0, 0, tuiBird.width, tuiBird.height);
    clearCanvas();

    let colorData;

    ctx.translate(400, 100);

    for (let posX = 0; posX < tuiBird.width; posX += 10) {
      for (let posY = 0; posY < tuiBird.height; posY += 10) {
        ctx.beginPath();
        colorData = getPixelColor(imageData, posX, posY);
        ctx.fillStyle = `rgba(${colorData.r}, ${colorData.g}, ${colorData.b}, 1.25)`;
        ctx.arc(posX, posY, randomInt(5, 25), 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }
  };
};

photoshopFilter();

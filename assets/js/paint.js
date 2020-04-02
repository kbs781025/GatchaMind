import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");

let currentColor = "rgba(0, 0, 0, 0)";
let currentLineWidth = "2.5";

let fillMode = false;

canvas.width = 500;
canvas.height = 700;

let painting = false;

function toggleButtonColor(button) {
  if (button.style.backgroundColor === "bisque") {
    button.style.backgroundColor = "white";
  } else {
    button.style.backgroundColor = "bisque";
  }
}

function initFillButton() {
  const fillButton = document.getElementById("jsMode");
  fillButton.addEventListener("click", function() {
    fillMode = !fillMode;
    if (fillMode) {
      fillButton.innerText = "Paint";
    } else {
      fillButton.innerText = "Fill";
    }

    toggleButtonColor(fillButton);
  });
}

function initColorButtons() {
  const colorButtons = document
    .getElementById("jsColors")
    .getElementsByTagName("div");

  const buttonArray = Array.from(colorButtons);

  buttonArray.forEach(color =>
    color.addEventListener("click", function() {
      currentColor = this.style.backgroundColor;
      getSocket().emit(window.events.setColor, currentColor);
    })
  );
}

function initRangeBar() {
  const rangeBar = document
    .getElementById("jsRange")
    .getElementsByTagName("input")[0];
  rangeBar.addEventListener("input", function() {
    currentLineWidth = this.value;
    getSocket().emit(window.events.setWidth, currentLineWidth);
  });
}

function initCanvas() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", onCanvasClick);

  context.strokeStyle = currentColor;
  context.lineWidth = currentLineWidth;
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (painting) {
    context.lineTo(x, y);
    context.stroke();
    getSocket().emit(window.events.stroking, {
      x,
      y
    });
  } else {
    context.beginPath(x, y);
    context.moveTo(x, y);
    getSocket().emit(window.events.mouseMoving, {
      x,
      y
    });
  }
}

function onCanvasClick() {
  if (fillMode) {
    context.fillStyle = currentColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    getSocket().emit(window.events.fillCanvas);
  }
}

function startPainting() {
  context.strokeStyle = currentColor;
  context.lineWidth = currentLineWidth;

  painting = true;
}

function stopPainting() {
  painting = false;
}

export function handleStroking({ x, y }) {
  context.lineTo(x, y);
  context.stroke();
}

export function handleMouseMoving({ x, y }) {
  context.beginPath(x, y);
  context.moveTo(x, y);
}

export function handleSetColor(color) {
  context.strokeStyle = color;
  context.fillStyle = color;
}

export function handleSetWidth(width) {
  context.lineWidth = width;
}

export function handleFillCanvas() {
  context.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  initCanvas();
  initColorButtons();
  initRangeBar();
  initFillButton();
}

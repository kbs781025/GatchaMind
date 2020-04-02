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
    })
  );
}

function initRangeBar() {
  const rangeBar = document
    .getElementById("jsRange")
    .getElementsByTagName("input")[0];
  rangeBar.addEventListener("input", function() {
    currentLineWidth = this.value;
  });
}

function initCanvas() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (painting) {
    context.lineTo(x, y);
    context.stroke();
  } else {
    context.beginPath(x, y);
    context.moveTo(x, y);
  }
}

function startPainting() {
  context.strokeStyle = currentColor;
  context.lineWidth = currentLineWidth;

  if (fillMode) {
    context.fillStyle = currentColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  painting = true;
}

function stopPainting() {
  painting = false;
}

if (canvas) {
  initCanvas();
  initColorButtons();
  initRangeBar();
  initFillButton();
}

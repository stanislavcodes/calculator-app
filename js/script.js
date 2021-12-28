// theme switcher
const toggler = document.querySelector(".toggler");
const container = document.querySelector(".container");
const screen = document.querySelector(".screen");
const attribution = document.querySelector(".attribution");
const togglerBtn = document.querySelector(".toggler-btn");
const togglerSwitch = document.querySelector(".toggler-switch");
const keyBox = document.querySelector(".key-box");
const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("click", () => {
    attribution.style.display = "none";
  });
});

toggler.addEventListener("click", () => {
  if (container.classList.contains("container-0")) {
    removePrevTheme(0);
    changeTheme(1);
  } else if (container.classList.contains("container-1")) {
    removePrevTheme(1);
    changeTheme(2);
  } else if (container.classList.contains("container-2")) {
    removePrevTheme(2);
    changeTheme(0);
  } else {
  }
});

function removePrevTheme(number) {
  container.classList.remove(`container-${number}`);
  screen.classList.remove(`screen-${number}`);
  attribution.classList.remove(`attribution-${number}`);
  togglerBtn.classList.remove(`toggler-btn-${number}`);
  togglerSwitch.classList.remove(`toggler-switch-${number}`);
  keyBox.classList.remove(`key-box-${number}`);
  del.classList.remove(`del-${number}`);
  reset.classList.remove(`reset-${number}`);
  equal.classList.remove(`equal-${number}`);
  keys.forEach((key) => {
    key.classList.remove(`key-${number}`);
  });
}

function changeTheme(number) {
  container.classList.add(`container-${number}`);
  screen.classList.add(`screen-${number}`);
  attribution.classList.add(`attribution-${number}`);
  togglerBtn.classList.add(`toggler-btn-${number}`);
  togglerSwitch.classList.add(`toggler-switch-${number}`);
  keyBox.classList.add(`key-box-${number}`);
  del.classList.add(`del-${number}`);
  reset.classList.add(`reset-${number}`);
  equal.classList.add(`equal-${number}`);
  keys.forEach((key) => {
    key.classList.add(`key-${number}`);
  });
}

// calculator logic
const del = document.querySelector(".del");
const reset = document.querySelector(".reset");
const equal = document.querySelector(".equal");
const point = document.querySelector(".point");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
let resultBox = document.querySelector(".result");
let operator = "",
  current = "0",
  previous = "0",
  result = 0,
  firstEntered = false,
  resultShowed = false;

// functions
function evaluate(num1, op, num2) {
  return eval(num1 + op + num2);
}

function updateResultScreen(value) {
  resultBox.innerHTML = value;
}

function resetCurrent() {
  current = "0";
  firstEntered = false;
}
function resetAll() {
  resetCurrent();
  operator = "";
  previous = "0";
  updateResultScreen("0");
}
function deleteLast() {
  current = current.slice(0, -1);
  updateResultScreen(current);
  if (resultBox.innerHTML.length < 1) {
    firstEntered = false;
    updateResultScreen("0");
  }
}

function input() {
  if (!firstEntered) {
    current = this.dataset.num;
    firstEntered = true;
  } else {
    current += this.dataset.num;
  }
  updateResultScreen(current);
}

function operate() {
  if ((previous == "0" && resultShowed == false) || resultShowed == true) {
    previous = current;
  } else {
    previous = evaluate(previous, operator, current);
    previous = Math.round(Number(previous) * 1000) / 1000;
    updateResultScreen(String(previous));
  }
  operator = this.dataset.op;
  resetCurrent();
}

// event listeners
numbers.forEach((number) => {
  number.addEventListener("click", input);
});

operations.forEach((operation) => {
  operation.addEventListener("click", operate);
});

equal.addEventListener("click", () => {
  previous = evaluate(previous, operator, current);
  previous = Math.round(Number(previous) * 1000) / 1000;
  current = String(previous);
  updateResultScreen(current);
  resultShowed = true;
});

// listener to control that there is only one point in number
point.addEventListener("click", () => {
  if (!resultBox.innerHTML.includes(".")) {
    current += ".";
    updateResultScreen(current);
  }
});

reset.addEventListener("click", resetAll);
del.addEventListener("click", deleteLast);

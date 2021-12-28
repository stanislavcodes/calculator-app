// listener to hide attribution
const keys = document.querySelectorAll(".key");
const attribution = document.querySelector(".attribution");
keys.forEach((key) => {
  key.addEventListener("click", () => {
    gsap.fromTo(".attribution", { opacity: 1, x:0 }, { opacity: 0, x: 80, duration: 0.25});
    setTimeout(() => {
      attribution.style.display = "none"
    }, 250);
  });
});

// theme switcher
const toggler = document.querySelector(".toggler");
const togglerSwitch = document.querySelector(".toggler-switch");
const doc = document.documentElement;
toggler.addEventListener("click", toggleTheme);
// function to set a given theme
function setTheme(number) {
  localStorage.setItem("theme", `theme-${number}`);
  document.documentElement.className = `theme-${number}`;
}
// function to toggle between themes
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-0") {
    setTheme(1);
  } else if (localStorage.getItem("theme") === "theme-1") {
    setTheme(2);
  } else {
    setTheme(0);
  }
}
// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-1") {
    setTheme(1);
  } else if (localStorage.getItem("theme") === "theme-2") {
    setTheme(2);
  } else {
    setTheme(0);
  }
})();

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

// some gsap animations
gsap.fromTo(".calculator-box", { scale: 0.85 }, { scale: 1 });
gsap.fromTo(".attribution", { x: 60 }, { x: 0 });
gsap.fromTo(".result", { x: -60 }, { x: 0 });

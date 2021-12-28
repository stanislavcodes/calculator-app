const toggler = document.querySelector(".toggler");
const container = document.querySelector(".container");
const screen = document.querySelector(".screen");
const togglerBtn = document.querySelector(".toggler-btn");
const togglerSwitch = document.querySelector(".toggler-switch");
const keyBox = document.querySelector(".key-box");
const keys = document.querySelectorAll(".key");

// theme switcher
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

let currentValue = "0",
  currentResult = 0,
  lastOperation = "",
  result = 0,
  firstEntered = false,
  pointsEntered = 0;

resultBox.innerHTML = String(currentValue);

numbers.forEach((number) => {
  number.addEventListener("click", inputValues);
});

function inputValues() {
  if (resultBox.innerHTML.length == 1 && !firstEntered) {
    currentValue = String(this.dataset.num);
    firstEntered = true;
  } else {
    currentValue += String(this.dataset.num);
  }
  resultBox.innerHTML = currentValue;
}

operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    if (currentResult != 0) {
      currentResult = evaluate(
        currentResult,
        lastOperation,
        Number(currentValue)
      );
      currentResult = Math.round(currentResult * 100) / 100;
      resetValues();
    } else {
      currentResult = Number(currentValue);
      resetValues();
    }
    lastOperation = String(operation.dataset.op);
    console.log(currentResult);
  });
});

equal.addEventListener("click", () => {
  if (currentResult != 0) {
    currentResult = evaluate(
      currentResult,
      lastOperation,
      Number(currentValue)
    );
    currentResult = Math.round(currentResult * 100) / 100;
    resetValues();
    resultBox.innerHTML = String(currentResult);
    lastOperation = "";
  } else {
  }
});

function evaluate(num1, op1, num2) {
  return eval(num1 + op1 + num2);
}

// listener to control that there is only one point in number
point.addEventListener("click", () => {
  pointsEntered++;
  if (pointsEntered > 1) {
  } else {
    currentValue += ".";
    resultBox.innerHTML = currentValue;
  }
});

del.addEventListener("click", () => {
  currentValue = currentValue.slice(0, -1);
  resultBox.innerHTML = currentValue;
  if (resultBox.innerHTML.length < 1) {
    firstEntered = false;
    resultBox.innerHTML = "0";
  }
});

reset.addEventListener("click", () => {
  resetValues();
  currentResult = 0;
});

function resetValues() {
  currentValue = "0";
  firstEntered = false;
  pointsEntered = 0;
  resultBox.innerHTML = currentValue;
}

/////////////////////////////////////////////////////
// let values = [],
//   ops = [] /*operations*/,
//   current = "0",
//   result = 0,
//   firstEntered = false,
//   pointsEntered = 0;

// resultBox.innerHTML = String(current);

// numbers.forEach((number) => {
//   number.addEventListener("click", inputValues);
// });

// function inputValues() {
//   if (resultBox.innerHTML.length == 1 && !firstEntered) {
//     current = String(this.dataset.num);
//     firstEntered = true;
//   } else {
//     current += String(this.dataset.num);
//   }
//   resultBox.innerHTML = current;
// }

// point.addEventListener("click", () => {
//   pointsEntered++;
//   if (pointsEntered > 1) {
//   } else {
//     current += ".";
//     resultBox.innerHTML = current;
//   }
// });

// operations.forEach((operation) => {
//   operation.addEventListener("click", () => {
//     let temp = current;
//     values.push(Number(temp));
//     ops.push(String(operation.dataset.op));
//     resetValues();
//     console.log(ops);
//   });
// });

// del.addEventListener("click", () => {
//   current = current.slice(0, -1);
//   resultBox.innerHTML = current;
//   if (resultBox.innerHTML.length < 1) {
//     firstEntered = false;
//     resultBox.innerHTML = "0";
//   }
// });

// reset.addEventListener("click", () => {
//   resetValues();
//   resetArrays();
// });

// function resetValues() {
//   current = "0";
//   firstEntered = false;
//   pointsEntered = 0;
//   resultBox.innerHTML = current;
// }

// function resetArrays() {
//   values = [];
//   ops = [];
// }

// equal.addEventListener("click", () => {
//   // console.log(eval(values[0] + ops[0] + values[1] + ops[1] + values[2]));
//   // resultBox.innerHTML = String(result);
// });

// function evaluate(num1, op1, num2) {
//   return eval(num1 + op1 + num2);
// }

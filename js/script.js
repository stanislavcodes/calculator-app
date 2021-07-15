const toggler = document.querySelector(".toggler");
const container = document.querySelector(".container");
const keyBox = document.querySelector(".key-box");
const key = document.querySelectorAll(".key");
const screen = document.querySelector(".screen");
const togglerBtn = document.querySelector(".toggler-btn");
const togglerSwitch = document.querySelector(".toggler-switch");
const del = document.querySelector(".del");
const reset = document.querySelector(".reset");
const equal = document.querySelector(".equal");

toggler.addEventListener("click", function () {
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
  key.forEach((key) => {
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
  key.forEach((key) => {
    key.classList.add(`key-${number}`);
  });
}

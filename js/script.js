const view = document.querySelector(".timer__container-view");
const pomodoroBtn = document.querySelector(".pomodoro");
const shortBreakBtn = document.querySelector(".shortbreak");

const timer = {
  pomodoro: 25,
  shortBreak: 5,
};

window.addEventListener("DOMContentLoaded", function () {
  view.textContent = `${timer.pomodoro}:00`;
});

pomodoroBtn.addEventListener("click", () => {
  view.textContent = `${timer.pomodoro}:00`;
});

shortBreakBtn.addEventListener("click", () => {
  view.textContent = `${timer.shortBreak}:00`;
});

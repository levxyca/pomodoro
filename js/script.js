const view = document.querySelector(".timer__container-view");
const pomodoroBtn = document.querySelector(".pomodoro");
const shortBreakBtn = document.querySelector(".shortbreak");
const startBtn = document.querySelector(".timer__container-start");

const notification = new Audio("../assets/notification.mp3");

const time = {
  pomodoro: 25,
  shortBreak: 5,
  secondsTimer: 0,
  seconds: 0,
  minutes: 0,
  qtdPomodoro: 0,
  qtdPomodoro25: 0,
};

window.addEventListener("DOMContentLoaded", function () {
  view.textContent = `${time.pomodoro}:00`;
});

pomodoroBtn.addEventListener("click", () => {
  view.textContent = `${time.pomodoro}:00`;
});

shortBreakBtn.addEventListener("click", () => {
  view.textContent = `${time.shortBreak}:00`;
});

function timer(mins) {
  time.secondsTimer = mins * 60 || 0;
  let interval = setInterval(() => {
    time.seconds = time.secondsTimer % 60 || 0;
    time.minutes = parseInt(time.secondsTimer / 60) % 60 || 0;
    view.textContent = `${time.minutes}:${time.seconds}`;
    time.secondsTimer--;
    if (!time.secondsTimer) {
      clearInterval(interval);
      notification.play();
      view.textContent = "00:00";
      if (mins === time.pomodoro) {
        time.qtdPomodoro25 += 1;
      }
      if (mins !== time.shortBreak) {
        time.qtdPomodoro += 1;
      }
      if (time.qtdPomodoro25 === 4) {
        alert(
          "You've already completed four 25-minute pomodoros, please get some rest!"
        );
      } else {
        alert(`Congratulations, you completed ${time.qtdPomodoro} pomodoro(s)`);
      }
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  const viewTime = parseInt(view.textContent);
  timer(viewTime);
});

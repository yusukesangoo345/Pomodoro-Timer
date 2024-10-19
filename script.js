let workMinutes = 25;
let breakMinutes = 5;
let seconds = 0;
let isWorkTime = true;
let timerInterval;
let cyclesCompleted = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const statusDisplay = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const progressBar = document.getElementById("progress");
const cyclesDisplay = document.getElementById("cycles");
const workDurationInput = document.getElementById("workDuration");
const breakDurationInput = document.getElementById("breakDuration");
const alarmSound = document.getElementById("alarmSound");

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
workDurationInput.addEventListener("input", updateDurations);
breakDurationInput.addEventListener("input", updateDurations);

function updateDurations() {
    workMinutes = parseInt(workDurationInput.value);
    breakMinutes = parseInt(breakDurationInput.value);
    resetTimer();
}

function startTimer() {
    startBtn.disabled = true;
    resetBtn.disabled = false;
    const totalWorkSeconds = workMinutes * 60;
    const totalBreakSeconds = breakMinutes * 60;
    let totalSeconds = isWorkTime ? totalWorkSeconds : totalBreakSeconds;

    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (workMinutes === 0 && isWorkTime) {
                statusDisplay.textContent = "Break time!";
                isWorkTime = false;
                workMinutes = parseInt(breakDurationInput.value);
                cyclesCompleted++;
                cyclesDisplay.textContent = cyclesCompleted;
                alarmSound.play();
            } else if (workMinutes === 0 && !isWorkTime) {
                statusDisplay.textContent = "Work time!";
                isWorkTime = true;
                workMinutes = parseInt(workDurationInput.value);
                alarmSound.play();
            } else {
                workMinutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        updateTimerDisplay();
        updateProgressBar(totalSeconds);
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    workMinutes = parseInt(workDurationInput.value);
    seconds = 0;
    isWorkTime = true;
    updateTimerDisplay();
    statusDisplay.textContent = "Ready to work?";
    progressBar.style.width = "0%";
    startBtn.disabled = false;
    resetBtn.disabled = true;
}

function updateTimerDisplay() {
    minutesDisplay.textContent = String(workMinutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function updateProgressBar(totalSeconds) {
    const elapsedSeconds = isWorkTime 
        ? (parseInt(workDurationInput.value) * 60 - workMinutes * 60 - seconds)
        : (parseInt(breakDurationInput.value) * 60 - workMinutes * 60 - seconds);
    const progressPercentage = (elapsedSeconds / totalSeconds) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

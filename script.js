// DOM elements
const breakLabel = document.getElementById('break-label');
const sessionLabel = document.getElementById('session-label');
const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timerLabel = document.getElementById('timer-label');
const timeLeft = document.getElementById('time-left');
const startStop = document.getElementById('start_stop');
const reset = document.getElementById('reset');
const beep = document.getElementById('beep');

// Initial settings
let breakDuration = 5;
let sessionDuration = 25;
let isSession = true;
let isRunning = false;
let intervalId;

// Update displayed time
function displayTime(minutes, seconds) {
  timeLeft.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update session and break durations
function updateDurations() {
  if (isSession) {
    timerLabel.textContent = 'Session';
    displayTime(sessionDuration, 0);
  } else {
    timerLabel.textContent = 'Break';
    displayTime(breakDuration, 0);
  }
}

// Event listener for break decrement
breakDecrement.addEventListener('click', () => {
  if (!isRunning && breakDuration > 1) {
    breakDuration--;
    breakLength.textContent = breakDuration;
    if (!isSession) {
      displayTime(breakDuration, 0);
    }
  }
});

// Event listener for break increment
breakIncrement.addEventListener('click', () => {
  if (!isRunning && breakDuration < 60) {
    breakDuration++;
    breakLength.textContent = breakDuration;
    if (!isSession) {
      displayTime(breakDuration, 0);
    }
  }
});

// Event listener for session decrement
sessionDecrement.addEventListener('click', () => {
  if (!isRunning && sessionDuration > 1) {
    sessionDuration--;
    sessionLength.textContent = sessionDuration;
    if (isSession) {
      displayTime(sessionDuration, 0);
    }
  }
});

// Event listener for session increment
sessionIncrement.addEventListener('click', () => {
  if (!isRunning && sessionDuration < 60) {
    sessionDuration++;
    sessionLength.textContent = sessionDuration;
    if (isSession) {
      displayTime(sessionDuration, 0);
    }
  }
});

// Event listener for start/stop
startStop.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startStop.textContent = 'Pause';
    intervalId = setInterval(updateTimer, 1000);
  } else {
    isRunning = false;
    startStop.textContent = 'Start';
    clearInterval(intervalId);
  }
});

// Event listener for reset
reset.addEventListener('click', () => {
  clearInterval(intervalId);
  isRunning = false;
  startStop.textContent = 'Start';
  if (beep.paused === false) {
    beep.pause();
    beep.currentTime = 0;
  }
  if (isSession) {
    sessionDuration = 25;
    displayTime(sessionDuration, 0);
  } else {
    breakDuration = 5;
    displayTime(breakDuration, 0);
  }
  updateDurations();
});

// Update the timer
function updateTimer() {
  if (sessionDuration === 0 && breakDuration === 0) {
    beep.play();
    if (isSession) {
      isSession = false;
      sessionDuration = 25;
    } else {
      isSession = true;
      breakDuration = 5;
    }
    updateDurations();
  } else if (isSession && sessionDuration > 0) {
    sessionDuration--;
    displayTime(sessionDuration, 59);
  } else if (!isSession && breakDuration > 0) {
    breakDuration--;
    displayTime(breakDuration, 59);
  }
}

// Initially display the session duration
updateDurations();

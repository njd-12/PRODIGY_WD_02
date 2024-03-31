let timer;
let startTime;
let lapStartTime;
let lapCounter = 1;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const lapInfoDisplay = document.getElementById('lap-info');
const startBtn = document.getElementById('start-btn');

function start() {
    if (!isRunning) {
        if (!timer) {
            startTime = Date.now();
            timer = setInterval(updateTimer, 10);
        }
        startBtn.textContent = 'Stop';
    } else {
        clearInterval(timer);
        timer = null;
        startBtn.textContent = 'Start';
    }
    isRunning = !isRunning;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000));
    timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
    return num.toString().padStart(size, '0');
}

function lap() {
    if (!startTime) return;

    clearInterval(timer); // Pause the timer
    const lapTime = Date.now() - (lapStartTime || startTime);
    const totalTime = Date.now() - startTime;
    const lapInfoEl = document.createElement('div');
    lapInfoEl.classList.add('lap-info');
    lapInfoEl.innerHTML = `
        <div>No. of Lap: ${lapCounter}</div>
        <div>Lap Time: ${formatTime(lapTime)}</div>
        <div>Total Time: ${formatTime(totalTime)}</div>
    `;
    lapInfoDisplay.appendChild(lapInfoEl);

    lapInfoDisplay.classList.add('show');
    lapStartTime = Date.now();
    lapCounter++;

    // Resume the timer
    timer = setInterval(updateTimer, 10);
}

function restart() {
    clearInterval(timer);
    timer = null;
    timerDisplay.textContent = '00:00:00.000';
    startTime = null;
    lapStartTime = null;
    lapCounter = 1;
    lapInfoDisplay.innerHTML = '';
    lapInfoDisplay.classList.remove('show');
    startBtn.textContent = 'Start';
    isRunning = false;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000));
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

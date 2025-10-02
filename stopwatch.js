let timer = null;
let elapsed = 0; // in milliseconds
let running = false;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(elapsed);
}

function startStop() {
    if (!running) {
        running = true;
        let last = Date.now();
        timer = setInterval(() => {
            const now = Date.now();
            elapsed += now - last;
            last = now;
            updateDisplay();
        }, 100);
        startStopBtn.textContent = 'Start/Stop';
    } else {
        running = false;
        clearInterval(timer);
        startStopBtn.textContent = 'Start/Stop';
    }
}

function reset() {
    running = false;
    clearInterval(timer);
    elapsed = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start/Stop';
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

updateDisplay();
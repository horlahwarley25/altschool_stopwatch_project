// Get references to DOM elements for buttons and time display
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondsElement = document.getElementById("second");

// Initialize time variables
let timeInSeconds = 0;
let timeInMinutes = 0;
let timeInHours = 0;

// State variables for stopwatch
let stopwatchStarted = false;
let setIntervalId;

// Event listener for Start/Stop button
startStopBtn.addEventListener("click", () => {
    if (!stopwatchStarted) {
        // Start the stopwatch
        stopwatchStarted = true;
        startStopBtn.textContent = "START/STOP";

        // Start interval to update time every second
        setIntervalId = setInterval(() => {
            // Increment seconds
            timeInSeconds += 1;
            updateUI(timeInSeconds, secondsElement);

            // Convert seconds to minutes
            if (timeInSeconds === 60) {
                timeInSeconds = 0;
                secondsElement.textContent = "00";
                timeInMinutes += 1;
                updateUI(timeInMinutes, minuteElement);
            }

            // Convert minutes to hours
            if (timeInMinutes === 60) {
                timeInMinutes = 0;
                minuteElement.textContent = "00";
                timeInHours += 1;

                // Stop at 99:59:59 and reset
                if (timeInHours === 100) {
                    clearInterval(setIntervalId);
                    alert(
                        "Stopwatch reached its maximum limit (99:59:59) and will now reset."
                    );
                    resetHandler();
                    return;
                }

                updateUI(timeInHours, hourElement);
            }
        }, 1000);
    } else {
        // Stop the stopwatch
        stopTimer();
        startStopBtn.textContent = "START/STOP";
    }
});

// Event listener for Reset button
resetBtn.addEventListener("click", resetHandler);

// Update the UI for a given time unit (hours, minutes, seconds)
function updateUI(time, timeElement) {
    const twoDigitTime = `0${time}`.slice(-2);
    timeElement.textContent = twoDigitTime;
}

// Stop the timer and clear interval
function stopTimer() {
    stopwatchStarted = false;
    clearInterval(setIntervalId);
}

// Reset the stopwatch to 00:00:00
function resetHandler() {
    stopTimer();
    startStopBtn.textContent = "START/STOP";
    timeInSeconds = timeInMinutes = timeInHours = 0;
    secondsElement.textContent =
        minuteElement.textContent =
        hour.textContent =
            "00";
}

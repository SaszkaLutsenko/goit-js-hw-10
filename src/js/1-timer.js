import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById("datetime-picker"); 
const startButton = document.querySelector('[data-start]');
let timerInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
            const currentDate = new Date();

            if (selectedDates[0] < currentDate) {
              window.alert("Please choose a date in the future");
              return;
            } 
            startButton.disabled = false;
          },
    };

const datePicker = flatpickr(datetimePicker, options);
const timerDisplay = document.querySelector('.timer');
const daysTimer = document.querySelector('.value[data-days]');
const hoursTimer = document.querySelector('.value[data-hours]');
const minsTimer = document.querySelector('.value[data-minutes]');
const secsTimer = document.querySelector('.value[data-seconds]');

startButton.addEventListener("click", () => {
    if (!startButton.disabled && !timerInterval) {
        startButton.disabled = true;
        datetimePicker.setAttribute("disabled", true);
    }

  timerInterval = setInterval(() => {
    const timeDifference = datePicker.selectedDates[0] - new Date();

    if (timeDifference <= 0) {
        clearInterval(timerInterval);
        
        return;
      }
    const diff = convertMs(timeDifference);
console.log(diff);

daysTimer.textContent = addLeadingZero(diff.days);
hoursTimer.textContent = addLeadingZero(diff.hours);
minsTimer.textContent = addLeadingZero(diff.minutes);
secsTimer.textContent = addLeadingZero(diff.seconds);
}, 1000);
});

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  
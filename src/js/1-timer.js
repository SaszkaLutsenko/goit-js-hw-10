
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('input[type="text"]');
input.classList.add("datetime-picker");
const startButton = document.querySelector('[data-start]');
startButton.classList.add("start-button");
startButton.disabled = true;
const spanDay = document.querySelector('[data-days]');
const spanSecond = document.querySelector('[data-seconds]');
const spanMinutes = document.querySelector('[data-minutes]')
const spanHoures = document.querySelector('[data-hours]');

class Timer {
    #timerElement = null;
    #time = 0;
    #intervalId = null;
    constructor(selector) {
        this.#timerElement = document.querySelector(selector);
    }

    setTime(timeMs) {
        this.#time = timeMs;
    }

    start() {
        this.#time = this.#time - Date.now();
        this.#intervalId = setInterval(() => {
            this.#render();
            this.#time -= 1000;
            if (this.#time < 0) {
                clearInterval(this.#intervalId);
            }
        }, 1000);

    }

    #convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.#pad(Math.floor(ms / day));
        const hours = this.#pad(Math.floor((ms % day) / hour));
        const minutes = this.#pad(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.#pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds }
    }

    #render() {
        if (!this.#timerElement) return;
        const { days, hours, minutes, seconds } = this.#convertMs(this.#time);
        spanDay.textContent = days;
        spanHoures.textContent = hours;
        spanMinutes.textContent = minutes;
        spanSecond.textContent = seconds;
    }

    #pad(value){
        return String(value).padStart(2, "0");
    }
}

let userSelectedDate = new Date();
const timer = new Timer('.timer');
const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const utcNow = Date.now();
        if (userSelectedDate.getTime() <= utcNow) {
            startButton.disabled = true;
            iziToast.warning({
                title: 'Caution',
                position: 'topCenter',
                message: 'Please choose a date in the future',
            });
        }
        else
        {
            startButton.disabled = false;
        }
        console.log(userSelectedDate);
    }
}

flatpickr(input, options);

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    timer.setTime(userSelectedDate.getTime());
    startButton.disabled = true;
    timer.start();
});